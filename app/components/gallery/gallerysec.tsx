"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { site } from "@/data/index";
import type { CaracureGalleryPageData } from "@/data/index";

const data: CaracureGalleryPageData = site.galleryPage;

function PlayButton({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border-2 border-white bg-black/40 text-white backdrop-blur-[2px] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e2232b] group-hover:border-[#e2232b] ${
        large ? "h-14 w-14 sm:h-[76px] sm:w-[76px]" : "h-11 w-11 sm:h-[60px] sm:w-[60px]"
      }`}
    >
      <FaPlay className={large ? "ml-1 h-5 w-5 sm:h-7 sm:w-7" : "ml-0.5 h-4 w-4 sm:h-5 sm:w-5"} />
    </span>
  );
}

function getYouTubeId(url: string | undefined): string | null {
  if (!url || url === "#") return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

type LightboxState =
  | { type: "image"; index: number }
  | { type: "video"; index: number }
  | null;

export default function GallerySection() {
  const [activeMedia, setActiveMedia] = useState<LightboxState>(null);

  useEffect(() => {
    if (activeMedia !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeMedia]);

  const handlePrev = useCallback(() => {
    setActiveMedia((prev) => {
      if (!prev) return null;
      if (prev.type === "image") {
        const nextIdx = (prev.index - 1 + data.images.length) % data.images.length;
        return { type: "image", index: nextIdx };
      } else {
        const nextIdx = (prev.index - 1 + data.videos.length) % data.videos.length;
        return { type: "video", index: nextIdx };
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveMedia((prev) => {
      if (!prev) return null;
      if (prev.type === "image") {
        const nextIdx = (prev.index + 1) % data.images.length;
        return { type: "image", index: nextIdx };
      } else {
        const nextIdx = (prev.index + 1) % data.videos.length;
        return { type: "video", index: nextIdx };
      }
    });
  }, []);

  useEffect(() => {
    if (!activeMedia) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMedia(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMedia, handlePrev, handleNext]);

  return (
    <>
      <section className="w-full bg-white mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
          {/* heading */}
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
                {data.badge}
              </p>
            </div>

            <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
              {data.titlePrefix}<span className="text-[#e2232b]">{data.titleHighlight}</span>
            </h2>

            <p className="mx-auto mt-2 max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
              {data.description}
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {data.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveMedia({ type: "image", index: i })}
                className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-md shadow-sm lg:aspect-[16/10]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-[760px] text-center"
          >
            <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
              {data.videoTitlePrefix}<span className="text-[#e2232b]">{data.videoTitleHighlight}</span>
            </h2>

            <p className="mx-auto mt-2 max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
              {data.videoDescription}
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:h-[380px] lg:grid-cols-[1.9fr_1fr] lg:grid-rows-2 xl:h-[400px]">
            {data.videos.map((v, i) => {
              const isMain = i === 0;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setActiveMedia({ type: "video", index: i })}
                  className={`group relative block cursor-pointer overflow-hidden rounded-md bg-black shadow-md ${
                    isMain
                      ? "aspect-video sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:aspect-auto"
                      : "aspect-video lg:aspect-auto"
                  }`}
                >
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes={
                      isMain
                        ? "(min-width: 1024px) 65vw, 100vw"
                        : "(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  <div
                    className={`absolute left-1/2 -translate-x-1/2 ${
                      isMain
                        ? "top-1/2 -translate-y-1/2"
                        : "top-[38%] -translate-y-1/2 lg:top-[32%]"
                    }`}
                  >
                    <PlayButton large={isMain} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3
                      className={`font-bold text-white ${
                        isMain ? "text-lg sm:text-2xl" : "text-base sm:text-xl"
                      }`}
                    >
                      {v.title}
                    </h3>
                    <p
                      className={`mt-1 leading-snug text-white/90 ${
                        isMain ? "text-xs sm:text-sm" : "text-xs"
                      }`}
                    >
                      {v.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeMedia !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveMedia(null)}
            className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-hidden bg-black/95 backdrop-blur-md p-4 sm:p-8 select-none"
          >
            {/* CLOSE BUTTON (Top Right) */}
            <button
              type="button"
              onClick={() => setActiveMedia(null)}
              aria-label="Close fullscreen view"
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[10000] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 hover:scale-110 active:scale-95 focus:outline-none"
            >
              <FiX className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous item"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[10000] flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm transition hover:bg-black/90 hover:scale-110 active:scale-95 focus:outline-none"
            >
              <FiChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next item"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[10000] flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm transition hover:bg-black/90 hover:scale-110 active:scale-95 focus:outline-none"
            >
              <FiChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] max-w-[85vw] flex-col items-center justify-center"
            >
              {activeMedia.type === "image" ? (
                <>
                  <motion.div
                    key={`img-${activeMedia.index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative max-h-[82vh] max-w-[85vw] overflow-hidden rounded-lg shadow-2xl"
                  >
                    <img
                      src={data.images[activeMedia.index].src}
                      alt={data.images[activeMedia.index].alt || "Gallery image"}
                      className="max-h-[80vh] max-w-[85vw] w-auto h-auto object-contain rounded-lg"
                    />
                  </motion.div>

                  {data.images[activeMedia.index].alt && (
                    <p className="mt-3 text-center text-sm font-medium text-white/90">
                      {data.images[activeMedia.index].alt}
                    </p>
                  )}
                  <span className="mt-1 text-xs text-white/50">
                    {activeMedia.index + 1} / {data.images.length}
                  </span>
                </>
              ) : (
                (() => {
                  const currentVideo = data.videos[activeMedia.index];
                  const ytId = getYouTubeId(currentVideo.href);
                  const isDirectVideo =
                    currentVideo.href && /\.(mp4|webm|ogg)$/i.test(currentVideo.href);

                  return (
                    <motion.div
                      key={`vid-${activeMedia.index}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="w-[90vw] max-w-[960px] flex flex-col items-center"
                    >
                      {ytId ? (
                        <>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl bg-black">
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                              title={currentVideo.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="h-full w-full border-0"
                            />
                          </div>
                          <div className="mt-3 text-center">
                            <h3 className="text-lg font-bold text-white sm:text-xl">
                              {currentVideo.title}
                            </h3>
                            <p className="mt-1 max-w-[600px] text-xs text-white/80 sm:text-sm">
                              {currentVideo.text}
                            </p>
                          </div>
                        </>
                      ) : isDirectVideo ? (
                        <>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl bg-black">
                            <video
                              src={currentVideo.href}
                              controls
                              autoPlay
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="mt-3 text-center">
                            <h3 className="text-lg font-bold text-white sm:text-xl">
                              {currentVideo.title}
                            </h3>
                            <p className="mt-1 max-w-[600px] text-xs text-white/80 sm:text-sm">
                              {currentVideo.text}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl bg-black border border-white/10">
                          <img
                            src={currentVideo.image}
                            alt={currentVideo.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                            <div className="flex items-center gap-4">
                              <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#e2232b] text-white shadow-lg shadow-red-600/40">
                                <FaPlay className="ml-0.5 text-lg sm:text-xl" />
                              </span>
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">
                                  {currentVideo.title}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm text-white/80 max-w-[550px] leading-relaxed">
                                  {currentVideo.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <span className="mt-3 text-xs text-white/50">
                        {activeMedia.index + 1} / {data.videos.length}
                      </span>
                    </motion.div>
                  );
                })()
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}