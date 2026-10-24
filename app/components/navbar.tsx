"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import { site as carData } from "@/data/index";
import type { CaracureBrandData, CaracureHeaderData } from "@/data/index";

const brandData: CaracureBrandData = carData.brand as CaracureBrandData;
const headerData: CaracureHeaderData = carData.navbar as CaracureHeaderData;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!brandData || !headerData) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="relative z-40 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        {/* LEFT: Logo (box width matches the logo, so there is no empty gap before the nav) */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Home"
          className="relative block h-15 w-[180px] shrink-0 sm:h-14 sm:w-[162px] lg:h-20 lg:w-[280px] xl:h-[88px] xl:w-[280px]"
        >
          <Image
            src={brandData.logo}
            alt={brandData.logoAlt}
            fill
            priority
            sizes="(min-width: 1280px) 255px, (min-width: 1024px) 186px, (min-width: 640px) 162px, 140px"
            className="object-contain object-left"
          />
        </Link>

        {/* RIGHT: Desktop Nav + CTA (lg:contents -> nav and button become direct items of the header,
            so justify-between spreads logo / nav / button evenly) */}
        <div className="hidden lg:contents">
          <nav aria-label="Main" className="flex items-center gap-6 lg:gap-8 xl:gap-10">
            {headerData.navItems.map((item) => {
              const active = isActive(item.href);

              const linkClass = `relative inline-flex items-center gap-1.5 py-1 text-[15px] lg:text-[17px] xl:text-[18px] font-bold transition-colors duration-200 after:absolute after:-bottom-2.5 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-[#e2232b] after:transition-all after:duration-200 ${
                active
                  ? "text-[#e2232b] after:scale-x-100"
                  : "text-[#0d1f45] after:scale-x-0 hover:text-[#e2232b] hover:after:scale-x-100"
              }`;

              return (
                <Link key={item.label} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Book a Service CTA Button */}
          <Link
            href={headerData.cta.href}
            className="whitespace-nowrap rounded-full bg-[#e2232b] px-8 py-3 text-[15px] font-semibold text-white shadow-md shadow-red-500/25 transition-all duration-200 hover:bg-[#c91d24] hover:shadow-lg hover:shadow-red-500/35 lg:px-9 lg:py-3 lg:text-[18px]"
          >
            {headerData.cta.label}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#0d1f45] transition-colors hover:bg-gray-100 lg:hidden"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto max-h-[calc(100vh-80px)] max-w-[1440px] overflow-y-auto px-5 py-4"
          >
            <ul className="flex flex-col divide-y divide-gray-100">
              {headerData.navItems.map((item) => {
                const active = isActive(item.href);
                const itemClass = `block flex-1 py-3.5 text-[16px] font-semibold ${
                  active ? "text-[#e2232b]" : "text-[#0d1f45]"
                }`;

                return (
                  <li key={item.label}>
                    <Link href={item.href} onClick={closeMenu} className={itemClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={headerData.cta.href}
              onClick={closeMenu}
              className="mt-5 block rounded-full bg-[#e2232b] py-3 text-center text-[16px] font-semibold text-white shadow-md shadow-red-500/25 transition-colors hover:bg-[#c91d24]"
            >
              {headerData.cta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}