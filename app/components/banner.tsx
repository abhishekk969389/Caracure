import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { site as carData } from "@/data/index";
import type { CaracureBannerData } from "@/data/index";

const bannerData: CaracureBannerData = carData.banner as CaracureBannerData;

export default function Banner() {
  if (!bannerData) return null;

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background image: public/banner.png */}
      <Image
        src={bannerData.bgImage}
        alt={bannerData.bgImageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center] lg:object-center"
      />
      
      {/* mobile: dark overlay for readable text, lg+: soft left fade only */}
    <div className="absolute inset-0 -z-10 bg-black/70 sm:hidden" />
     
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[42%] -z-10 hidden h-[26%] w-[6%] bg-gradient-to-t from-[#ff2a24]/70 to-transparent lg:block"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="mx-auto flex min-h-[520px] max-w-[1320px] flex-col px-4 py-6 sm:min-h-[580px] sm:px-6 lg:min-h-[480px] lg:px-10 xl:px-6">
        {/* Content */}
        <div className="flex flex-1 items-center py-10 sm:py-12">
          <div className="max-w-[640px]">
            {/* tagline */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-[3px] w-10 bg-[#ff2a24] sm:w-12" />
              <p className="text-xs font-semibold uppercase text-white sm:text-sm lg:text-base">
                {bannerData.taglinePrefix}<span className="text-[#ff2a24]">{bannerData.taglineHighlight}</span>
              </p>
            </div>

            {/* heading (h1 uses the global display font) */}
            <h1 className="mt-2 text-4xl font-extrabold uppercase leading-[1.08] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px]">
              {bannerData.h1Line1}
              <br />
              <span className="text-[#ff2a24]">{bannerData.h1Highlight}</span>{bannerData.h1Line2}
            </h1>

            {/* description */}
            <p className="mt-2 max-w-[540px] text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              {bannerData.description}
            </p>

            {/* button */}
            <Link
              href={bannerData.button.href}
              className="group mt-4 inline-flex items-center gap-3 rounded-full bg-[#ff2a24] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-colors hover:bg-[#e01f1a] sm:px-10 sm:py-4 sm:text-base"
            >
              {bannerData.button.label}
              <FiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}