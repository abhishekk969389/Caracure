"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Testimonial = {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
};

const BG_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=80";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "New Delhi, India",
    text: "Excellent service and professional staff! My car was serviced on time and now it's running smoother than ever. Highly recommended for anyone looking for reliable car care.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Gurgaon, India",
    text: "Great experience! The team quickly identified the issue and fixed it at a reasonable cost. Very honest and skilled. I'll definitely come back for future services.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    location: "Noida, India",
    text: "Transparent pricing and no unnecessary add-ons. They explained every repair clearly and returned my car earlier than promised. Truly a trustworthy garage.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 4,
    name: "Amit Khanna",
    location: "Faridabad, India",
    text: "Brought my SUV for a brake and suspension issue. The mechanics were knowledgeable and the work quality is top-notch. The ride feels brand new again.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 5,
    name: "Neha Kapoor",
    location: "Ghaziabad, India",
    text: "Friendly staff, clean workshop and quick pickup and drop service. My regular service now happens here without any stress. Highly satisfied with the results.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 6,
    name: "Vikram Singh",
    location: "Greater Noida, India",
    text: "Best car service I've had in years. They diagnosed an engine noise others missed and fixed it the same day. Fair price and genuine spare parts.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

export default function Testimonials() {
  // 1 card on mobile / tablet, 2 cards on lg and above
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(testimonials.length / perView);

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

  return (
    <section className="relative overflow-hidden py-8 mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      {/* Background image + dark overlay */}
      <Image
        src={BG_IMAGE}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-[1150px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-white sm:text-sm">
              Client Feedback
            </p>
          </div>

          <h2 className="text-3xl font-extrabold uppercase text-white sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            Testi<span className="text-[#e2232b]">monials</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-white/90 sm:text-base">
            What our customers say about our car repair and service experience.
          </p>
        </div>

        {/* Slider */}
        <div className="mt-6 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {testimonials.map((t) => (
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
        </div>

        {/* Controls: arrows + dots */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2232b] text-white transition hover:bg-[#c41d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-11"
          >
            <FiArrowLeft className="text-xl" />
          </button>

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

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2232b] text-white transition hover:bg-[#c41d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-11"
          >
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}