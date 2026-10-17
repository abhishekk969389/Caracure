import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const BACKUP_DIR = path.resolve('_originals_backup/public');

const TARGET_MAX_BYTES = 51200; // 50 KB hard limit
const SAFE_TARGET_BYTES = 49152; // 48 KB target

// Files that MUST NOT be touched
const KEEP_UNTOUCHED = new Set([
  'service/s1.jpg',
  'tes/t1.jpg',
  'tes/t4.jpg',
]);

const results = [];

function getRelativePath(fullPath, baseDir) {
  return path.relative(baseDir, fullPath).replace(/\\/g, '/');
}

async function getAllFiles(dir) {
  let fileList = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      fileList = fileList.concat(await getAllFiles(fullPath));
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function processImage(relPath) {
  if (relPath === 'logoo.png') {
    // Unused file, delete it
    const publicPath = path.join(PUBLIC_DIR, 'logoo.png');
    if (fs.existsSync(publicPath)) {
      const stats = fs.statSync(publicPath);
      fs.unlinkSync(publicPath);
      results.push({
        file: 'logoo.png',
        status: 'DELETED (unused)',
        oldSize: (stats.size / 1024).toFixed(1) + ' KB',
        newSize: '0 KB',
        dimensions: '-',
        quality: '-'
      });
    }
    return;
  }

  const origPath = path.join(BACKUP_DIR, relPath);
  const origStats = fs.statSync(origPath);
  const origSizeKB = (origStats.size / 1024).toFixed(1) + ' KB';

  if (KEEP_UNTOUCHED.has(relPath)) {
    results.push({
      file: relPath,
      status: 'UNTOUCHED (already <= 50KB)',
      oldSize: origSizeKB,
      newSize: origSizeKB,
      dimensions: 'original',
      quality: 'original'
    });
    return;
  }

  const image = sharp(origPath);
  const metadata = await image.metadata();
  const origW = metadata.width;
  const origH = metadata.height;
  const isPng = origPath.toLowerCase().endsWith('.png');

  // Rules:
  // For JPGs: re-encode as JPEG (mozjpeg, progressive, 4:2:0, strip metadata), same path and extension.
  // For PNGs: convert to WebP (keep alpha only where source has it), strip metadata.
  // For banners (banner, help, footer, subbanner), cap max width at 1600px.
  // Loop: try ORIGINAL dimensions (or capped 1600) with quality from 80 down to 50 (step 5).
  // If still > 48 KB, reduce width by 10% and retry from quality 75 down to 45.
  // Don't go below quality 45 or below 500px on longest side.

  let outRelPath = relPath;
  if (isPng) {
    outRelPath = relPath.replace(/\.png$/i, '.webp');
  }
  const outFullPath = path.join(PUBLIC_DIR, outRelPath);

  let curW = origW;
  const isBanner = ['banner.png', 'help.png', 'footer.png', 'subbanner.png'].includes(relPath);
  if (isBanner && curW > 1600) {
    curW = 1600;
  }

  let bestBuffer = null;
  let bestQuality = null;
  let bestW = curW;
  let bestH = Math.round((curW / origW) * origH);

  let widthAttempts = 0;
  let success = false;

  while (curW >= 500 && widthAttempts < 15) {
    const curH = Math.round((curW / origW) * origH);
    const startQ = widthAttempts === 0 ? 80 : 75;

    for (let q = startQ; q >= 45; q -= 5) {
      let pipeline = sharp(origPath);
      if (curW !== origW) {
        pipeline = pipeline.resize(curW, curH, { fit: 'inside', withoutEnlargement: true });
      }

      if (isPng) {
        pipeline = pipeline.webp({
          quality: q,
          alphaQuality: 85,
          effort: 6,
        });
      } else {
        pipeline = pipeline.jpeg({
          quality: q,
          mozjpeg: true,
          progressive: true,
          chromaSubsampling: '4:2:0',
        });
      }

      const buffer = await pipeline.toBuffer();
      if (buffer.length <= SAFE_TARGET_BYTES) {
        bestBuffer = buffer;
        bestQuality = q;
        bestW = curW;
        bestH = curH;
        success = true;
        break;
      }

      if (buffer.length <= TARGET_MAX_BYTES && !bestBuffer) {
        bestBuffer = buffer;
        bestQuality = q;
        bestW = curW;
        bestH = curH;
      }
    }

    if (success) break;

    // Reduce width by 10%
    curW = Math.round(curW * 0.9);
    widthAttempts++;
  }

  if (!bestBuffer || bestBuffer.length > TARGET_MAX_BYTES) {
    console.error(`FAILED to compress ${relPath} under 50KB! Best was: ${bestBuffer ? bestBuffer.length : 'none'}`);
    results.push({
      file: outRelPath,
      status: 'FAILED',
      oldSize: origSizeKB,
      newSize: bestBuffer ? (bestBuffer.length / 1024).toFixed(1) + ' KB' : 'ERROR',
      dimensions: `${bestW}x${bestH}`,
      quality: bestQuality
    });
    return;
  }

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outFullPath), { recursive: true });
  fs.writeFileSync(outFullPath, bestBuffer);

  // If PNG was converted to WebP, delete the old PNG from public/
  if (isPng && fs.existsSync(path.join(PUBLIC_DIR, relPath))) {
    fs.unlinkSync(path.join(PUBLIC_DIR, relPath));
  }

  results.push({
    file: outRelPath,
    status: 'COMPRESSED',
    oldSize: origSizeKB,
    newSize: (bestBuffer.length / 1024).toFixed(1) + ' KB',
    dimensions: `${origW}x${origH} -> ${bestW}x${bestH}`,
    quality: bestQuality,
    warning: (bestQuality < 55 || bestW < origW) ? (bestQuality < 55 ? 'Quality < 55' : 'Resized') : 'OK'
  });
}

async function run() {
  console.log('--- Starting Image Compression ---');
  const backupFiles = await getAllFiles(BACKUP_DIR);
  const relPaths = backupFiles.map(f => getRelativePath(f, BACKUP_DIR)).sort();

  for (const rel of relPaths) {
    await processImage(rel);
  }

  console.log('\n--- Compression Summary ---');
  console.table(results);

  const failed = results.filter(r => r.status === 'FAILED');
  if (failed.length > 0) {
    console.error(`\n${failed.length} images failed to meet the <= 50 KB requirement!`);
    process.exit(1);
  } else {
    console.log('\nAll images successfully processed and under 50 KB!');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
