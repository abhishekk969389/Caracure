"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { site } from "@/data/index";
import type { TeamMember } from "@/types/car";

const iconMap: Record<string, IconType> = {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
  FaPhoneAlt,
};

export default function TeamDetailSection({ member }: { member: TeamMember }) {
  const detailData = site.ourTeam.detail;
  if (!detailData) return null;

  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-[760px] text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
              TEAM <span className="font-bold text-[#e2232b]">DETAIL</span>
            </p>
          </div>
          <h2 className="text-3xl font-extrabold uppercase text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            {detailData.titlePrefix}<span className="text-[#e2232b]">{detailData.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            {detailData.description}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[40%_1fr] lg:gap-12 xl:gap-16">
          {/* LEFT: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-slate-100 p-2.5 rounded-sm shadow-md"
          >
            <div className="relative h-full w-full min-h-[350px] overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-between lg:py-2.5"
          >
            <div>
              <h3 className="text-3xl font-bold text-[#e2232b] sm:text-[40px] leading-none -mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                {member.name}
              </h3>
              <p className="mt-2 text-base font-bold text-slate-500 sm:text-lg">
                {member.role}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {member.bio?.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Contact Items */}
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              {member.email && (
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#e2232b]">
                    <FaEnvelope className="text-lg" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Email Address</p>
                    <a href={`mailto:${member.email}`} className="text-sm font-bold text-[#0d1f45] hover:text-[#e2232b] sm:text-base">
                      {member.email}
                    </a>
                  </div>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#e2232b]">
                    <FaPhoneAlt className="text-lg" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Phone Number</p>
                    <a href={member.phoneHref || `tel:${member.phone}`} className="text-sm font-bold text-[#0d1f45] hover:text-[#e2232b] sm:text-base">
                      {member.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Social Icons */}
            {member.socials && member.socials.length > 0 && (
              <div className="mt-8 flex gap-3">
                {member.socials.map((social) => {
                  const Icon = iconMap[social.icon];
                  if (!Icon) return null;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={`${member.name} on ${social.label}`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-colors hover:bg-[#e2232b] hover:border-[#e2232b] hover:text-white shadow-sm"
                    >
                      <Icon className="text-sm" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
