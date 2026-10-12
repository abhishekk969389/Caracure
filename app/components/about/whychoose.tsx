"use client";

import Image from "next/image";
import type { IconType } from "react-icons";
import { FaCar, FaCog, FaTools } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { motion } from "framer-motion";

import { site } from "@/data/index";
import type { CaracureWhyChooseUsData } from "@/data/index";

const iconMap: Record<string, IconType> = {
  FaCar,
  FaTools,
  MdOutlineVerifiedUser,
  FaCog,
};

const data: CaracureWhyChooseUsData = site.whyChooseUs;

export default function WhyChooseUs() {
  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* LEFT: image */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg sm:aspect-[16/11] lg:aspect-auto lg:h-[490px]"
          >
            <Image
              src={data.mainImage}
              alt={data.mainImageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* RIGHT: content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* badge */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
              <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
                {data.badge}
              </p>
            </div>

            {/* heading (h2 uses the global display font) */}
            <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
              {data.titlePrefix}<span className="text-[#e2232b]">{data.titleHighlight}</span>
            </h2>

            <p className="mt-2 max-w-[620px] text-sm leading-relaxed text-slate-600 sm:text-base">
              {data.description}
            </p>

            {/* features */}
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 xl:gap-x-8">
              {data.features.map(({ title, text, icon }, idx) => {
                const Icon = iconMap[icon];
                if (!Icon) return null;
                return (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#e2232b] sm:h-16 sm:w-16">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold leading-snug text-[#0d1f45] sm:text-lg">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {text}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}