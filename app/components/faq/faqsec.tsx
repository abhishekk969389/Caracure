"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

import { site } from "@/data/index";
import type { CaracureFaqPageData } from "@/data/index";
import type { IconType } from "react-icons";

const data: CaracureFaqPageData = site.faqPage;

const iconMap: Record<string, IconType> = {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
};

export default function FaqSection() {
  // index of the open item, null = all closed (first one open by default)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
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
          <h2 className="text-3xl font-extrabold leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            {data.titlePrefix}<span className="text-[#e2232b]">{data.titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            {data.description}
          </p>
        </div>

        <div className="mt-6 grid items-start gap-8 sm:mt-10 lg:grid-cols-[1.5fr_1fr] lg:gap-8 xl:gap-10">
          {/* LEFT: accordion */}
          <div className="space-y-4">
            {data.faqs.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={faq.question}
                  className={`rounded-md border transition-colors ${
                    open
                      ? "border-[#e2232b]/15 bg-[#fdeeee]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="text-base font-bold text-[#0d1f45] sm:text-lg">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors sm:h-9 sm:w-9 ${
                          open
                            ? "bg-[#e2232b] text-white"
                            : "bg-[#e2232b]/10 text-[#e2232b]"
                        }`}
                      >
                        {open ? <FiMinus className="text-lg" /> : <FiPlus className="text-lg" />}
                      </span>
                    </button>
                  </h3>

                  {/* smooth open/close */}
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pr-12 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:pr-16 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: image + get in touch */}
          <aside className="flex w-full flex-col overflow-hidden rounded-md shadow-[0_8px_30px_rgba(13,31,69,0.12)] lg:h-[640px] xl:h-[680px]">
            <div className="relative min-h-[240px] flex-1 sm:min-h-[300px] lg:min-h-0">
              <Image
                src={data.contactImage}
                alt={data.contactTitle}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover object-top"
              />
            </div>

            <div className="bg-gradient-to-br from-[#8f0f18] to-[#b3131d] p-5 text-white sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide sm:text-sm">
                {data.contactSubtitle}
              </p>
              <span className="mt-2 block h-[3px] w-12 bg-white" />

              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{data.contactTitle}</h3>
              <p className="mt-1 max-w-[340px] text-sm leading-relaxed text-white/90">
                {data.contactText}
              </p>

              <ul className="mt-4 space-y-3">
                {data.contacts.map(({ icon, text, href }) => {
                  const Icon = iconMap[icon];
                  if (!Icon) return null;
                  return (
                    <li key={text} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#e2232b]">
                        <Icon className="h-4 w-4" />
                      </span>
                      {href ? (
                        <a href={href} className="text-sm hover:underline sm:text-base">
                          {text}
                        </a>
                      ) : (
                        <span className="text-sm leading-snug sm:text-base">{text}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}