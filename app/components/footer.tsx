"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandshake,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

import type { IconType } from "react-icons";
import { site as carData } from "@/data/index";
import type { CaracureFooterData, CaracureBrandData } from "@/data/index";

const footerData: CaracureFooterData = carData.footer as CaracureFooterData;
const brandData: CaracureBrandData = carData.brand as CaracureBrandData;

const iconMap: Record<string, IconType> = {
  FaFacebookF,
  FaTwitter: FaXTwitter,
  FaInstagram,
  FaYoutube,
};

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white sm:text-xl">{children}</h3>
      <span className="mt-2.5 block h-[3px] w-8 bg-[#e2232b] sm:mt-3 sm:w-10" />
    </div>
  );
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group inline-flex items-center gap-2 text-xs text-white/90 transition hover:text-[#e2232b] sm:gap-3 sm:text-base"
          >
            <FiChevronRight className="shrink-0 text-xs transition-transform duration-200 group-hover:translate-x-1 sm:text-base" />
            <span className="leading-snug">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  if (!footerData || !brandData) return null;

  return (
    <footer className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14 text-white">
      {/* Background image: /public/footer.png */}
      <Image
        src={footerData.bgImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12] via-[#0b0d12]/85 to-[#0b0d12]/20" />

      <div className="relative">
        {/* Main */}
        <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.4fr] lg:gap-8 lg:pr-10 xl:gap-10 xl:pr-20 2xl:pr-44">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="col-span-2 lg:col-span-1"
            >
              <Link href="/" aria-label="CarAcure home" className="inline-block">
                {/* Put your logo at /public/logo.png */}
                <Image
                  src={brandData.logo}
                  alt={brandData.logoAlt}
                  width={320}
                  height={90}
                  className="h-auto w-[220px] sm:w-[280px] lg:w-[300px]"
                />
              </Link>

              <p className="mt-5 max-w-[460px] text-sm leading-relaxed text-white/90 sm:text-base">
                {footerData.aboutText}
              </p>

              <div className="mt-6 flex items-center gap-3">
                {footerData.socials.map(({ label, href, icon }) => {
                  const Icon = iconMap[icon];
                  if (!Icon) return null;
                  return (
                    <motion.div key={label} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={href}
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 text-white transition hover:border-[#e2232b] hover:bg-[#e2232b]"
                      >
                        <Icon className="text-base" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="col-span-1"
            >
              <FooterHeading>Quick Links</FooterHeading>
              <LinkList items={footerData.quickLinks} />
            </motion.div>

            {/* Our Services */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="col-span-1"
            >
              <FooterHeading>Our Services</FooterHeading>
              <LinkList items={footerData.services} />
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="col-span-2 lg:col-span-1"
            >
              <FooterHeading>Contact Info</FooterHeading>

              <ul className="mt-5 space-y-4 text-sm sm:text-base">
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b]">
                    <FaPhoneAlt className="text-sm" />
                  </span>
                  <a href={brandData.phoneHref} className="hover:text-[#e2232b]">
                    {brandData.phoneLabel}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b]">
                    <FaEnvelope className="text-sm" />
                  </span>
                  <a
                    href={brandData.emailHref}
                    className="break-all hover:text-[#e2232b]"
                  >
                    {brandData.email}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b]">
                    <FaMapMarkerAlt className="text-sm" />
                  </span>
                  <address className="not-italic leading-snug">
                    {brandData.addressLine1}
                    <br />
                    {brandData.addressLine2}
                  </address>
                </li>
              </ul>

              {/* Support box */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="mt-5 flex w-full max-w-[420px] items-center gap-3 rounded-lg border border-[#e2232b]/60 bg-gradient-to-r from-[#5b0d13]/90 via-[#3a0b10]/90 to-[#1c0a0d]/90 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm xl:gap-4 xl:px-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e2232b] xl:h-14 xl:w-14">
                  <FaHandshake className="text-xl text-white xl:text-2xl" />
                </span>
                <span className="h-12 w-px shrink-0 bg-white/60 xl:h-14" />
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-[15px] font-bold leading-tight text-white xl:text-base">
                    {footerData.supportCard.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-white/90 xl:text-sm">
                    {footerData.supportCard.text}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1320px] px-4 py-5 text-center text-sm sm:px-6 sm:py-6 sm:text-base lg:px-10 xl:px-6">
            &copy; {footerData.copyrightText?.split('{brandName}')[0]}
            
            {footerData.copyrightText?.split('{brandName}')[1]}
          </div>
        </div>
      </div>
    </footer>
  );
}