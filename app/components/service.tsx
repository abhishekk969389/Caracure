"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import { site as carData } from "@/data/index";
import type { CaracureServicesData } from "@/data/index";

const servicesData: CaracureServicesData = carData.ourServices as CaracureServicesData;

export default function ServicesSection() {
  if (!servicesData) return null;
  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Heading (centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
              {servicesData.badge}
            </p>
          </div>

          {/* h2 uses the global display font */}
          <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            {servicesData.titlePrefix}<span className="text-[#e2232b]">{servicesData.titleHighlight}</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            {servicesData.description}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {servicesData.services.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (idx % 4) * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-lg bg-white p-3 shadow-[0_4px_22px_rgba(15,31,75,0.07)] ring-1 ring-gray-100 transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,31,75,0.14)] sm:p-3.5"
              >
                {/* image */}
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-slate-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* content */}
                <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                  <h3 className="text-base font-bold leading-tight text-[#0d1f45] transition-colors group-hover:text-[#e2232b] sm:text-lg">
                    {service.title}
                  </h3>

                  <div className="mt-2 flex flex-1 items-center gap-3">
                    <p className="flex-1 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
                      {service.text}
                    </p>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-[#e2232b] transition-colors duration-300 group-hover:bg-[#e2232b] group-hover:text-white">
                      <FaArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}