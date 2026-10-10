"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const unsplash = (id: string, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

type Member = { name: string; role: string; image: string };

// Keep the count a multiple of 4 (8, 12...) so every page is full on desktop (4), tablet (2) and mobile (1).
// Replace the photo IDs with your own Unsplash photos.
const members: Member[] = [
  { name: "Rahul Sharma", role: "Service Manager", image: unsplash("1500648767791-00dcc994a43e") },
  { name: "Priya Verma", role: "Senior Technician", image: unsplash("1494790108377-be9c29b29330") },
  { name: "Amit Kumar", role: "Auto Technician", image: unsplash("1507003211169-0a1dd7228f2d") },
  { name: "Neha Singh", role: "Brake Specialist", image: unsplash("1438761681033-6461ffad8d80") },
  { name: "Vikram Singh", role: "Engine Specialist", image: unsplash("1472099645785-5658abf4ff4e") },
  { name: "Anjali Gupta", role: "Customer Support", image: unsplash("1544005313-94ddf0286df2") },
  { name: "Rohit Mehra", role: "Wheel & Alignment Expert", image: unsplash("1506794778202-cad84cf45f1d") },
  { name: "Kavita Joshi", role: "Quality Inspector", image: unsplash("1573496359142-b8d87734a5a2") },
];

const socials = [
  { label: "Facebook", Icon: FaFacebookF },
  { label: "Twitter", Icon: FaTwitter },
  { label: "Instagram", Icon: FaInstagram },
  { label: "LinkedIn", Icon: FaLinkedinIn },
];

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

export default function TeamSection() {
  const perView = usePerView();
  const [page, setPage] = useState(0);
  const touchX = useRef<number | null>(null);

  const pages = Math.ceil(members.length / perView);
  const current = Math.min(page, pages - 1); // stays valid when the screen is resized

  const goTo = (p: number) => setPage(Math.max(0, Math.min(p, pages - 1)));

  const onTouchEnd = (x: number) => {
    if (touchX.current === null) return;
    const diff = touchX.current - x;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Heading (centered) */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
              Our Team
            </p>
          </div>

          {/* h2 uses the global display font */}
          <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            Our Awesome <span className="text-[#e2232b]">Team</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            Meet our skilled and experienced team members who are dedicated to providing the
            best car care and repair services.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="-mx-3 overflow-hidden"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {members.map((m) => (
              <div
                key={m.name}
                className="shrink-0 basis-full px-3 py-6 sm:basis-1/2 lg:basis-1/4"
              >
                <article className="group flex h-full flex-col rounded-lg bg-white p-3.5 text-center shadow-[0_4px_22px_rgba(15,31,75,0.08)] ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(226,35,43,0.18)] hover:ring-red-100">
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
                  <span className="mx-auto mt-2.5 h-[2px] w-10 bg-[#e2232b] transition-all duration-300 group-hover:w-16" />

                  <ul className="mt-4 flex items-center justify-center gap-2.5 pb-1">
                    {socials.map(({ label, Icon }) => (
                      <li key={label}>
                        <a
                          href="#"
                          aria-label={`${m.name} on ${label}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-[#e2232b] transition-colors duration-300 hover:bg-[#e2232b] hover:text-white"
                        >
                          <Icon size={13} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Dots pagination (clickable) */}
        <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label="Team pages">
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
      </div>
    </section>
  );
}