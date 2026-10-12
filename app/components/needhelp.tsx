"use client";

import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaCar, FaTools } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import { motion } from "framer-motion";

import { site as carData } from "@/data/index";
import type { CaracureHelpData } from "@/data/index";

const helpData: CaracureHelpData = carData.help as CaracureHelpData;

const iconMap: Record<string, IconType> = {
  FaTools,
  MdVerifiedUser,
  FaCar,
};

export default function HelpSection() {
  if (!helpData) return null;

  return (
    <section className="relative isolate mt-8 w-full overflow-hidden bg-[#0a0a0a] sm:mt-10 md:mt-12 lg:mt-14">
      {/* Background image: public/help.png */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.85 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={helpData.bgImage}
          alt={helpData.bgImageAlt}
          fill
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-center"
        />
      </motion.div>

      {/* mobile: dark overlay for readable text, lg+: soft left fade only */}
      <div className="absolute inset-0 -z-10 bg-black/70 sm:hidden" />
      <div className="mx-auto flex min-h-[460px] max-w-[1320px] items-center px-4 py-12 sm:min-h-[480px] sm:px-6 lg:min-h-[420px] lg:px-10 xl:px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[620px]"
        >
          {/* badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase text-white sm:text-sm">
              {helpData.badge}
            </p>
          </div>

          {/* heading (h2 uses the global display font) */}
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px]">
            {helpData.titlePrefix}<span className="text-[#e2232b]">{helpData.titleHighlight}</span>
          </h2>

          <p className="max-w-[540px] mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
            {helpData.description}
          </p>

          {/* highlights */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-0">
            {helpData.highlights.map(({ label, icon }, i) => {
              const Icon = iconMap[icon];
              if (!Icon) return null;
              return (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`flex items-center gap-3 ${
                    i > 0 ? "sm:ml-6 sm:border-l sm:border-white/25 sm:pl-6" : ""
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b] text-white shadow-lg shadow-red-600/30 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="max-w-[90px] text-xs font-semibold leading-tight text-white sm:text-sm">
                    {label}
                  </span>
                </motion.li>
              );
            })}
          </ul>

          {/* button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-block"
          >
            <Link
              href={helpData.button.href}
              className="group inline-flex items-center gap-4 rounded-full bg-[#e2232b] py-2 pl-7 pr-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-colors hover:bg-[#c91d24] sm:text-base"
            >
              {helpData.button.label}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#e2232b] transition-transform duration-300 group-hover:translate-x-0.5">
                <FiArrowRight size={20} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}