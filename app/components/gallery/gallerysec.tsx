import Image from "next/image";
import { FaPlay } from "react-icons/fa";

import { site } from "@/data/index";
import type { CaracureGalleryPageData } from "@/data/index";

const data: CaracureGalleryPageData = site.galleryPage;

function PlayButton({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border-2 border-white bg-black/30 text-white backdrop-blur-[2px] transition group-hover:bg-[#e2232b] group-hover:border-[#e2232b] ${
        large ? "h-14 w-14 sm:h-[76px] sm:w-[76px]" : "h-11 w-11 sm:h-[60px] sm:w-[60px]"
      }`}
    >
      <FaPlay className={large ? "ml-1 h-5 w-5 sm:h-7 sm:w-7" : "ml-0.5 h-4 w-4 sm:h-5 sm:w-5"} />
    </span>
  );
}

export default function GallerySection() {
  return (
    <>
      {/* ================= WORKING GALLERY ================= */}
      <section className="w-full bg-white mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
          {/* heading */}
          <div className="mx-auto max-w-[760px] text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
              <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
                {data.badge}
              </p>
            </div>

            {/* h2 uses the global display font */}
            <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
              {data.titlePrefix}<span className="text-[#e2232b]">{data.titleHighlight}</span>
            </h2>

            <p className="mx-auto mt-2 max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
              {data.description}
            </p>
          </div>

          {/* grid: 1 col mobile, 2 col sm, 3 col lg+ */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {data.images.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-md lg:aspect-[16/10]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEO GALLERY ================= */}
      <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
          {/* heading */}
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
              {data.videoTitlePrefix}<span className="text-[#e2232b]">{data.videoTitleHighlight}</span>
            </h2>

            <p className="mx-auto mt-2 max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
              {data.videoDescription}
            </p>
          </div>

          {/* layout: big card left, 2 stacked cards right (lg+) */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:h-[380px] lg:grid-cols-[1.9fr_1fr] lg:grid-rows-2 xl:h-[400px]">
            {data.videos.map((v, i) => {
              const isMain = i === 0;
              return (
                <a
                  key={v.title}
                  href={v.href}
                  aria-label={`Play video: ${v.title}`}
                  className={`group relative block overflow-hidden rounded-md bg-black ${
                    isMain
                      ? "aspect-video sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:aspect-auto"
                      : "aspect-video lg:aspect-auto"
                  }`}
                >
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes={
                      isMain
                        ? "(min-width: 1024px) 65vw, 100vw"
                        : "(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* gradient for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                  {/* play button */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 ${
                      isMain
                        ? "top-1/2 -translate-y-1/2"
                        : "top-[38%] -translate-y-1/2 lg:top-[32%]"
                    }`}
                  >
                    <PlayButton large={isMain} />
                  </div>

                  {/* caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3
                      className={`font-bold text-white ${
                        isMain ? "text-lg sm:text-2xl" : "text-base sm:text-xl"
                      }`}
                    >
                      {v.title}
                    </h3>
                    <p
                      className={`mt-1 leading-snug text-white/90 ${
                        isMain ? "text-xs sm:text-sm" : "text-xs"
                      }`}
                    >
                      {v.text}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}