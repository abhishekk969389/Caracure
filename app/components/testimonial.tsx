"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

import { site as carData } from "@/data/index";
import type { CaracureTestimonialData } from "@/data/index";

const testimonialData: CaracureTestimonialData = carData.testimonials as CaracureTestimonialData;

export default function Testimonials() {
  // 1 card on mobile / tablet, 2 cards on lg and above
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil((testimonialData?.testimonials.length || 0) / perView);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // keep page valid when perView changes (resize)
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const prev = useCallback(
    () => setPage((p) => (p === 0 ? pageCount - 1 : p - 1)),
    [pageCount]
  );
  const next = useCallback(
    () => setPage((p) => (p === pageCount - 1 ? 0 : p + 1)),
    [pageCount]
  );

  if (!testimonialData) return null;

  return (
    <section className="relative overflow-hidden py-8 mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      {/* Background image + dark overlay */}
      <Image
        src={testimonialData.bgImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-[1150px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-white sm:text-sm">
              {testimonialData.badge}
            </p>
          </div>

          <h2 className="text-3xl font-extrabold uppercase text-white sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            {testimonialData.titlePrefix}<span className="text-[#e2232b]">{testimonialData.titleHighlight}</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-white/90 sm:text-base">
            {testimonialData.description}
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="mt-6 overflow-hidden"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {testimonialData.testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full shrink-0 px-0 py-1 lg:w-1/2 lg:px-3"
                style={{ flexBasis: perView === 2 ? "50%" : "100%" }}
              >
                <article className="flex h-full flex-col rounded-md bg-white p-5 shadow-lg sm:p-6">
                  <div className="flex items-start justify-between">
                    <FaQuoteLeft className="text-4xl text-[#e2232b]/30 sm:text-[44px]" />
                    <div className="flex gap-1 text-[#f5a623]">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FaStar key={i} className="text-sm sm:text-base" />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 flex-1 px-1 text-sm leading-relaxed text-[#0d1f45] sm:px-3 sm:text-base">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="mt-5 flex items-center gap-4 border-t border-slate-200 pt-5">
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#e2232b] sm:h-16 sm:w-16">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0d1f45] sm:text-lg">
                        {t.name}
                      </h3>
                      <p className="text-sm text-slate-500">{t.location}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Controls: arrows + dots */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2232b] text-white transition hover:bg-[#c41d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-11"
          >
            <FiArrowLeft className="text-xl" />
          </motion.button>

          <div className="flex items-center gap-2" role="tablist">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={page === i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  page === i ? "bg-[#e2232b]" : "bg-white/80 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2232b] text-white transition hover:bg-[#c41d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-11"
          >
            <FiArrowRight className="text-xl" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}