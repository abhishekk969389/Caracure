"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaComment, FaHeart, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import { site as carData } from "@/data/index";
import type { CaracureBlogData } from "@/data/index";

const blogData: CaracureBlogData = carData.ourBlogs as CaracureBlogData;

export default function LatestNews({ isPaginated = false }: { isPaginated?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!blogData) return null;

  const itemsPerPage = 6;
  const totalPosts = blogData.posts.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const displayedPosts = isPaginated
    ? blogData.posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : blogData.posts.slice(0, 3); // Home page shows only top 3

  return (
    <section className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
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
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
              {blogData.badge}
            </p>
          </div>

          <h2 className="text-3xl font-extrabold uppercase text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            {blogData.titlePrefix}<span className="text-[#e2232b]">{blogData.titleHighlight}</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            {blogData.description}
          </p>
        </motion.div>

        {/* Cards: 1 col mobile, 2 col md, 3 col lg+ */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {displayedPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <article
                className="group flex h-full flex-col rounded-md bg-white p-4 shadow-[0_8px_30px_rgba(13,31,69,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(13,31,69,0.15)] sm:p-5"
              >
                {/* Image + date badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 flex h-[60px] w-[68px] flex-col items-center justify-center bg-[#e2232b] leading-tight text-white sm:h-[68px] sm:w-[76px]">
                    <span className="text-xl font-extrabold sm:text-2xl">
                      {post.day}
                    </span>
                    <span className="text-xs font-medium sm:text-sm">
                      {post.month}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-extrabold leading-snug text-[#0d1f45] sm:text-xl">
                  <Link href={post.href} className="transition-colors hover:text-[#e2232b]">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <Link
                  href={post.href}
                  className="mt-5 inline-flex w-fit items-center gap-3 font-medium text-[#e2232b]"
                >
                  Read More
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2232b]/10 transition group-hover:bg-[#e2232b] group-hover:text-white">
                    <FaArrowRight className="text-sm" />
                  </span>
                </Link>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {isPaginated && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center border border-gray-400 text-gray-900 transition hover:bg-[#e2232b] hover:text-white hover:border-[#e2232b] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`flex h-10 w-10 items-center justify-center border transition ${
                    currentPage === pageNumber
                      ? "border-[#e2232b] bg-[#e2232b] text-white"
                      : "border-gray-300 text-gray-600 hover:border-[#e2232b] hover:bg-[#e2232b] hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 transition hover:bg-[#e2232b] hover:text-white hover:border-[#e2232b] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}