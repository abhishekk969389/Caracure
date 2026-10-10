import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaCog, FaHandshake, FaWrench } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";

import { site as carData } from "@/data/index";
import type { CaracureAboutSectionData } from "@/data/index";

const aboutData: CaracureAboutSectionData = carData.about as CaracureAboutSectionData;

const iconMap: Record<string, IconType> = {
  FaWrench,
  FaCog,
  FaHandshake,
  MdVerifiedUser,
};

export default function AboutSection() {
  if (!aboutData) return null;
  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* LEFT: content */}
          <div>
            {/* badge */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
              <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm ">
                {aboutData.badge}
              </p>
            </div>

            {/* heading (h2 uses the global display font) */}
            <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
              {aboutData.titlePrefix}<span className="text-[#e2232b]">{aboutData.titleHighlight}</span>
            </h2>

            <p className="max-w-[580px] text-sm leading-relaxed text-slate-600 sm:text-base">
              {aboutData.text}
            </p>

            {/* features */}
            <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {aboutData.features.map(({ title, text, icon }) => {
                const Icon = iconMap[icon];
                if (!Icon) return null;
                return (
                  <div key={title} className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#e2232b]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-tight text-[#0d1f45]">{title}</h3>
                      <p className="mt-1 text-[13px] leading-snug text-slate-500 sm:text-sm">
                        {text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* button */}
            <Link
              href={aboutData.button.href}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#e2232b] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-colors hover:bg-[#c91d24] sm:text-base"
            >
              {aboutData.button.label}
              <FiArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* RIGHT: overlapping image collage (all sizes in % so it scales) */}
          <div className="relative mx-auto aspect-[7/5] w-full max-w-[640px] lg:max-w-none">
            {/* big image, top-left */}
            <div className="absolute left-0 top-0 h-[95%] w-[63%] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
              <Image
                src={aboutData.mainImage}
                alt={aboutData.mainImageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>

            {/* small image, bottom-right, overlapping with a white border */}
            <div className="absolute bottom-0 right-0 h-[75%] w-[46%] overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-xl">
              <Image
                src={aboutData.secondImage}
                alt={aboutData.secondImageAlt}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}