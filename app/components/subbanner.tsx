"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site as carData } from "@/data/index";
import type { SubBannerKey } from "@/data/index";
import type { BreadcrumbItem } from "@/types/car";

interface SubBannerProps {
  pageKey?: SubBannerKey;
  title?: string;
  bgImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function SubBanner({
  pageKey,
  title,
  bgImage,
  breadcrumbs,
}: SubBannerProps) {
  const subBannerData = pageKey ? carData.subBanners[pageKey] : undefined;

  const displayTitle = title || subBannerData?.title || "Page Title";
  const displayBgImage =
    bgImage ||
    subBannerData?.bgImage ||
    "/subbanner.png";

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: displayTitle, active: true },
  ];

  const displayBreadcrumbs =
    breadcrumbs || subBannerData?.breadcrumbs || defaultBreadcrumbs;

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={displayBgImage}
          alt={displayTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_center]"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60 sm:hidden" />

      {/* Main container: Left-aligned content */}
      <div className="mx-auto flex min-h-[220px] max-w-[1320px] flex-col justify-center px-6 py-12 text-left sm:min-h-[280px] sm:px-10 lg:min-h-[360px] lg:px-27">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl font-black uppercase tracking-wider text-white sm:text-3xl md:text-4xl"
        >
          {displayTitle}
        </motion.h1>

        {/* Minimal inline breadcrumbs directly below title */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          aria-label="Breadcrumb"
          className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-300 sm:text-sm md:text-base"
        >
          {displayBreadcrumbs.map((item, i) => {
            const isLast = i === displayBreadcrumbs.length - 1;
            return (
              <div key={item.label} className="flex items-center gap-2">
                {item.href && !item.active ? (
                  <Link
                    href={item.href}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-300">{item.label}</span>
                )}

                {!isLast && <span className="text-slate-500">/</span>}
              </div>
            );
          })}
        </motion.nav>
      </div>
    </section>
  );
}