"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Car Repair", href: "/services/car-repair" },
      { label: "Oil Change", href: "/services/oil-change" },
      { label: "Wheel Alignment", href: "/services/wheel-alignment" },
      { label: "Brake Service", href: "/services/brake-service" },
      { label: "Car Wash & Detailing", href: "/services/car-wash" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const CTA = { label: "Book a Service", href: "/contact" };

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        {/* LEFT: Logo (box width matches the logo, so there is no empty gap before the nav) */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Home"
          className="relative block h-12 w-[140px] shrink-0 sm:h-14 sm:w-[162px] lg:h-20 lg:w-[280px] xl:h-[88px] xl:w-[280px]"
        >
          <Image
            src="/main-logo.png"
            alt="CarAcure"
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
            {navItems.map((item) => {
              const active = isActive(item.href);

              // Matched typography, colors, and underline styling from the image
              const linkClass = `relative inline-flex items-center gap-1.5 py-1 text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 after:absolute after:-bottom-2.5 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-[#e2232b] after:transition-all after:duration-200 ${
                active
                  ? "text-[#e2232b] after:scale-x-100"
                  : "text-[#0d1f45] after:scale-x-0 hover:text-[#e2232b] hover:after:scale-x-100"
              }`;

              if (!item.children) {
                return (
                  <Link key={item.label} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="group relative">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                    <FiChevronDown
                      size={17}
                      className="stroke-[2.5] transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-[220px] overflow-hidden rounded-xl bg-white py-2 shadow-[0_12px_36px_rgba(15,31,75,0.12)] ring-1 ring-gray-100">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-5 py-2.5 text-[14px] font-medium text-[#0d1f45] transition-colors hover:bg-red-50 hover:text-[#e2232b]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Book a Service CTA Button */}
          <Link
            href={CTA.href}
            className="whitespace-nowrap rounded-full bg-[#e2232b] px-8 py-3 text-[15px] font-semibold text-white shadow-md shadow-red-500/25 transition-all duration-200 hover:bg-[#c91d24] hover:shadow-lg hover:shadow-red-500/35 lg:px-9 lg:py-4 lg:text-[18px]"
          >
            {CTA.label}
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
              {navItems.map((item) => {
                const active = isActive(item.href);
                const itemClass = `block flex-1 py-3.5 text-[16px] font-semibold ${
                  active ? "text-[#e2232b]" : "text-[#0d1f45]"
                }`;

                return (
                  <li key={item.label}>
                    {item.children ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link href={item.href} onClick={closeMenu} className={itemClass}>
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setServicesOpen((v) => !v)}
                            aria-label="Toggle services submenu"
                            aria-expanded={servicesOpen}
                            className="flex h-11 w-11 items-center justify-center text-[#0d1f45]"
                          >
                            <FiChevronDown
                              size={20}
                              className={`transition-transform duration-300 ${
                                servicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                        {servicesOpen && (
                          <ul className="mb-3 ml-2 border-l-2 border-red-200 pl-4">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={closeMenu}
                                  className="block py-2 text-sm font-medium text-slate-600 hover:text-[#e2232b]"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link href={item.href} onClick={closeMenu} className={itemClass}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <Link
              href={CTA.href}
              onClick={closeMenu}
              className="mt-5 block rounded-full bg-[#e2232b] py-3 text-center text-[16px] font-semibold text-white shadow-md shadow-red-500/25 transition-colors hover:bg-[#c91d24]"
            >
              {CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}