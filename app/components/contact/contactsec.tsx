"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegCommentDots,
  FaRegEnvelope,
  FaRegFileAlt,
  FaRegUser,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { site } from "@/data/index";
import type { CaracureContactPageData } from "@/data/index";

const data: CaracureContactPageData = site.contactPage;

const iconMap: Record<string, IconType> = {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
};

const fieldBase =
  "w-full rounded-sm border border-slate-200 bg-white py-3.5 pl-11 pr-3 text-sm text-[#0d1f45] placeholder:text-slate-500 focus:border-[#e2232b] focus:outline-none focus:ring-1 focus:ring-[#e2232b]";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSent(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `form` to your API route / email service here
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* ================= GET IN TOUCH ================= */}
      <section className="relative w-full overflow-hidden bg-slate-50">
        {/* right image panel with slanted left edge (lg+) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[47%] bg-[#e2232b] lg:block"
          style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-[46%] lg:block"
          style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <Image
            src={data.bgImage}
            alt="Car repair workshop"
            fill
            sizes="46vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
          <div className="grid items-center gap-10 mt-8 sm:mt-10 md:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-10 ">
            {/* LEFT: info */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
                <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
                  {data.badge}
                </p>
              </div>

              {/* h2 uses the global display font */}
              <h2 className="text-3xl font-extrabold leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
                {data.titlePrefix}<span className="text-[#e2232b]">{data.titleHighlight}</span>
              </h2>

              <p className="mt-2 max-w-[600px] text-sm leading-relaxed text-slate-600 sm:text-base">
                {data.description}
              </p>

              {/* info cards */}
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                {data.infos.map(({ title, lines, icon }) => {
                  const Icon = iconMap[icon];
                  if (!Icon) return null;
                  return (
                    <div key={title} className="flex items-start gap-4 border-b border-slate-200 pb-5">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e2232b]/10 text-[#e2232b] sm:h-16 sm:w-16">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-[#0d1f45]">{title}</h3>
                        <div className="mt-1 space-y-0.5 text-sm text-slate-600">
                          {lines.map((l) => (
                            <p key={l} className="break-words">
                              {l}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* social */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[#0d1f45] sm:text-xl">
                  {data.socialTitle}
                </h3>
                <span className="mt-1 block h-[3px] w-10 bg-[#e2232b]" />
                <p className="mt-2 text-sm text-slate-600">
                  {data.socialText}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {data.socials.map(({ label, href, icon, bg }) => {
                    const Icon = iconMap[icon];
                    if (!Icon) return null;
                    return (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:-translate-y-0.5 hover:shadow-lg ${bg}`}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: form card (overlaps image on lg+) */}
            <div className="w-full lg:max-w-[500px]">
              <form
                onSubmit={onSubmit}
                className="rounded-md bg-white p-5 shadow-[0_10px_40px_rgba(13,31,69,0.15)] sm:p-7"
              >
                <h3 className="text-xl font-bold text-[#0d1f45] sm:text-2xl">
                  {data.formTitle}
                </h3>
                <span className="mt-2 block h-[3px] w-10 bg-[#e2232b]" />
                <p className="mt-3 text-sm text-slate-600">
                  {data.formText}
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <FaRegUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your Name"
                      required
                      className={fieldBase}
                    />
                  </div>
                  <div className="relative">
                    <FaRegEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="Email Address"
                      required
                      className={fieldBase}
                    />
                  </div>
                </div>

                <div className="relative mt-4">
                  <FaRegFileAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="Subject"
                    required
                    className={fieldBase}
                  />
                </div>

                <div className="relative mt-4">
                  <FaRegCommentDots className="pointer-events-none absolute left-4 top-4 text-slate-400" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Message"
                    rows={4}
                    required
                    className={`${fieldBase} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-sm bg-[#e2232b] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c91d24]"
                >
                  {data.formButtonText}
                  <FiArrowRight className="text-lg" />
                </button>

                {sent && (
                  <p role="status" className="mt-3 text-center text-sm font-medium text-green-600">
                    {data.formSuccessMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
          <iframe
            src={data.mapSrc}
            title="Our location on Google Maps"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            className="h-[300px] rounded-[20px] border border-slate-800/80 shadow-2xl sm:h-[380px] lg:h-[450px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </>
  );
}