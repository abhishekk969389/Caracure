import Image from "next/image";
import Link from "next/link";
import { FaUser, FaQuoteLeft } from "react-icons/fa";
import { site } from "@/data/index";
import type { BlogPostItem } from "@/types/car";

export default function BlogDetailSection({ post }: { post: BlogPostItem }) {
  const allPosts = site.ourBlogs.posts;
  const detailData = site.ourBlogs.detail;

  // Get 5 recent posts excluding current
  const recentPosts = allPosts.filter((p) => p.id !== post.id).slice(0, detailData?.recentCount || 5);

  return (
    <div className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          
          {/* LEFT: Article */}
          <article>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-md bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            
            <div className="mt-8 flex items-start gap-5">
              {/* Date Badge */}
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-[#e2232b] text-white">
                <span className="text-2xl font-bold leading-none">{post.day}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-wider">{post.month}</span>
              </div>
              
              {/* Title & Author */}
              <div>
                <h1 className="text-2xl font-extrabold leading-tight text-[#0d1f45] sm:text-3xl lg:text-[32px]" style={{ fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h1>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <FaUser className="text-[#e2232b]" />
                  <span className="font-medium">By {post.author}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 sm:text-base">
              {/* Intro */}
              {post.intro && <p>{post.intro}</p>}

              {/* Sections */}
              {post.sections?.map((section, idx) => (
                <div key={idx} className="mt-10 pt-2">
                  <h2 className="mb-4 text-xl font-bold text-[#0d1f45] sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {section.heading}
                  </h2>
                  
                  <div className="space-y-4">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Section Images */}
                  {section.images && section.images.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {section.images.map((img, iIdx) => (
                        <div key={iIdx} className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-100">
                          <Image
                            src={img}
                            alt={`${section.heading} image ${iIdx + 1}`}
                            fill
                            sizes="(min-width: 640px) 33vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quote */}
                  {section.quote && (
                    <div className="mt-8 flex gap-4 rounded-r-md border-l-4 border-[#e2232b] bg-red-50 p-6">
                      <FaQuoteLeft className="shrink-0 text-3xl text-[#e2232b]" />
                      <p className="text-base font-medium italic text-slate-700 sm:text-lg">
                        "{section.quote}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
          
          {/* RIGHT: Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-lg bg-red-50/60 border border-red-100/50">
              <div className="p-6 sm:p-8 pb-4">
                <h3 className="text-xl font-bold text-[#0d1f45]">{detailData?.recentTitle || "Recent Posts"}</h3>
                <span className="mt-3 block h-[3px] w-10 bg-[#e2232b]" />
              </div>
              
              <ul className="flex flex-col px-6 pb-6 sm:px-8 sm:pb-8">
                {recentPosts.map((rp) => (
                  <li key={rp.id} className="border-t border-red-100/60 first:border-t-0 py-4 first:pt-0 last:pb-0">
                    <Link href={rp.href} className="group flex items-start gap-4">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-slate-200">
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="line-clamp-2 text-sm font-bold leading-snug text-[#0d1f45] transition-colors group-hover:text-[#e2232b]">
                          {rp.title}
                        </h4>
                        <span className="mt-1 text-xs font-medium text-slate-500">
                          {rp.date}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
