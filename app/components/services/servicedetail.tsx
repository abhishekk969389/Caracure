import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { site } from "@/data/index";
import type { ServiceItem } from "@/types/car";

export default function ServiceDetailSection({ service }: { service: ServiceItem }) {
  const allServices = site.ourServices.services;
  const detailData = site.ourServices.detail;

  // Split title into words to highlight the last word
  const titleWords = service.title.split(" ");
  const lastWord = titleWords.pop();
  const restTitle = titleWords.join(" ");

  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          
          {/* LEFT: Main Content */}
          <div>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-md bg-slate-100">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            
            <h2 className="mt-8 text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl lg:text-[40px] xl:text-[44px]" style={{ fontFamily: 'var(--font-display)' }}>
              {restTitle} <span className="text-[#e2232b]">{lastWord}</span>
            </h2>
            <span className="mt-3 block h-[3px] w-10 bg-[#e2232b]" />
            
            <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-sm md:text-base">
              {service.description}
            </p>

            {service.included && service.included.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-extrabold text-[#0d1f45] sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {detailData?.includedPrefix}<span className="text-[#e2232b]">{detailData?.includedHighlight}</span>
                </h3>
                
                <div className="mt-6 rounded-md bg-gray-100 p-6 sm:p-8 border border-slate-100 shadow-[0_4px_22px_rgba(15,31,75,0.04)]">
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="shrink-0 text-lg text-[#e2232b]" />
                        <span className="text-sm md:text-base font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {service.process && service.process.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-extrabold text-[#0d1f45] sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {detailData?.processPrefix}<span className="text-[#e2232b]">{detailData?.processHighlight}</span>
                </h3>
                
                {service.processIntro && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {service.processIntro}
                  </p>
                )}

                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {service.process.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* RIGHT: Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-lg bg-red-50/60 overflow-hidden border border-red-100/50">
              <div className="p-6 sm:p-6">
                <h3 className="text-xl font-bold text-[#0d1f45]">{detailData?.sidebarTitle || "All Services"}</h3>
                <span className="mt-3 block h-[3px] w-10 bg-[#e2232b]" />
              </div>
              
              <ul className="flex flex-col">
                {allServices.map((s) => {
                  const isActive = s.slug === service.slug;
                  return (
                    <li key={s.slug} className="border-t border-red-100/60 first:border-t-0">
                      <Link 
                        href={`/services/${s.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-center justify-between px-6 py-4 sm:px-8 text-sm md:text-base font-bold transition-all ${
                          isActive 
                            ? "bg-[#e2232b] text-white" 
                            : "text-[#0d1f45] hover:text-[#e2232b] hover:bg-red-50"
                        }`}
                      >
                        {s.title}
                        <FaArrowRight 
                          className={`text-sm transition-transform ${
                            isActive ? "text-white" : "text-slate-400 group-hover:text-[#e2232b] group-hover:translate-x-1"
                          }`} 
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
