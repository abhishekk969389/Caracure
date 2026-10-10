import SubBanner from "@/app/components/subbanner";
import GallerySection from "../components/gallery/gallerysec";

export default function GalleryPage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="gallery" />
      <GallerySection/>
          </main>
  );
}
