"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

import type { IconType } from "react-icons";
import { site as carData } from "@/data/index";
import type { CaracureTeamData } from "@/data/index";

const teamData: CaracureTeamData = carData.ourTeam as CaracureTeamData;

const iconMap: Record<string, IconType> = {
  FaFacebookF,
  FaTwitter: FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
};

// cards per page: 4 on lg+, 2 on sm, 1 on mobile (matches the basis-* classes below)
function usePerView() {
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    const update = () =>
      setPerView(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

export default function TeamSection({ isGrid = false }: { isGrid?: boolean }) {
  const perView = usePerView();
  const [page, setPage] = useState(0);
  const touchX = useRef<number | null>(null);

  const pages = Math.ceil((teamData?.members.length || 0) / perView);
  const current = Math.min(page, pages - 1); // stays valid when the screen is resized

  const goTo = (p: number) => setPage(Math.max(0, Math.min(p, pages - 1)));

  const onTouchEnd = (x: number) => {
    if (perView <= 1 || touchX.current === null) return;
    const diff = touchX.current - x;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    touchX.current = null;
  };

  if (!teamData) return null;

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
              {teamData.badge}
            </p>
          </div>

          {/* h2 uses the global display font */}
          <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            {teamData.titlePrefix}<span className="text-[#e2232b]">{teamData.titleHighlight}</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            {teamData.description}
          </p>
        </motion.div>

        {/* Content */}
        {isGrid ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamData.members.map((m, idx) => (
              <motion.div
                key={m.slug || m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.1, ease: "easeOut" }}
              >
              <article className="group flex h-full flex-col rounded-lg bg-white p-3.5 text-center shadow-[0_4px_22px_rgba(15,31,75,0.08)] ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(226,35,43,0.18)] hover:ring-red-100">
                <Link href={m.slug ? `/teams/${m.slug}` : "#"} className="block">
                  <div className="relative aspect-[8/7] w-full overflow-hidden rounded-sm bg-slate-200">
                    <Image
                      src={m.image}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-tight text-[#0d1f45] transition-colors duration-300 group-hover:text-[#e2232b] sm:text-xl">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{m.role}</p>
                  <span className="mx-auto mt-2.5 block h-[2px] w-10 bg-[#e2232b] transition-all duration-300 group-hover:w-16" />
                </Link>

                <ul className="mt-4 flex items-center justify-center gap-2.5 pb-1">
                  {teamData.socials.map(({ label, icon }) => {
                    const Icon = iconMap[icon];
                    if (!Icon) return null;
                    return (
                      <li key={label}>
                        <a
                          href="#"
                          aria-label={`${m.name} on ${label}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-[#e2232b] transition-colors duration-300 hover:bg-[#e2232b] hover:text-white"
                        >
                          <Icon size={13} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </article>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full sm:-mx-3 overflow-x-auto sm:overflow-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory sm:snap-none"
            onTouchStart={(e) => {
              if (perView > 1) touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (perView > 1) onTouchEnd(e.changedTouches[0].clientX);
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: perView > 1 ? `translateX(-${current * 100}%)` : "none" }}
            >
              {teamData.members.map((m) => (
                <div
                  key={m.slug || m.name}
                  className="shrink-0 w-full basis-full sm:basis-1/2 lg:basis-1/4 px-0 sm:px-3 py-6 snap-start sm:snap-none"
                >
                  <article className="group flex h-full flex-col rounded-lg bg-white p-3.5 text-center shadow-[0_4px_22px_rgba(15,31,75,0.08)] ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(226,35,43,0.18)] hover:ring-red-100">
                    <Link href={m.slug ? `/teams/${m.slug}` : "#"} className="block">
                      <div className="relative aspect-[8/7] w-full overflow-hidden rounded-sm bg-slate-200">
                        <Image
                          src={m.image}
                          alt={`${m.name}, ${m.role}`}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-bold leading-tight text-[#0d1f45] transition-colors duration-300 group-hover:text-[#e2232b] sm:text-xl">
                        {m.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{m.role}</p>
                      <span className="mx-auto mt-2.5 block h-[2px] w-10 bg-[#e2232b] transition-all duration-300 group-hover:w-16" />
                    </Link>

                    <ul className="mt-4 flex items-center justify-center gap-2.5 pb-1">
                      {teamData.socials.map(({ label, icon }) => {
                        const Icon = iconMap[icon];
                        if (!Icon) return null;
                        return (
                          <li key={label}>
                            <a
                              href="#"
                              aria-label={`${m.name} on ${label}`}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-[#e2232b] transition-colors duration-300 hover:bg-[#e2232b] hover:text-white"
                            >
                              <Icon size={13} />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Dots pagination (clickable) - Hidden on mobile */}
        {!isGrid && (
          <div
            className="hidden sm:flex items-center justify-center gap-2.5"
            role="tablist"
            aria-label="Team pages"
          >
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#e2232b]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}