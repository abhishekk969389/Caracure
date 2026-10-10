import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background image: public/banner.png */}
      <Image
        src="/banner.png"
        alt="Mechanic repairing a car engine in a garage"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center] lg:object-center"
      />
     
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[42%] -z-10 hidden h-[26%] w-[6%] bg-gradient-to-t from-[#ff2a24]/70 to-transparent lg:block"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="mx-auto flex min-h-[520px] max-w-[1320px] flex-col px-4 py-6 sm:min-h-[580px] sm:px-6 lg:min-h-[480px] lg:px-10 xl:px-6">
        {/* Content */}
        <div className="flex flex-1 items-center py-10 sm:py-12">
          <div className="max-w-[640px]">
            {/* tagline */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-[3px] w-10 bg-[#ff2a24] sm:w-12" />
              <p className="text-xs font-semibold uppercase text-white sm:text-sm lg:text-base">
                Trusted Car Care <span className="text-[#ff2a24]">Experts</span>
              </p>
            </div>

            {/* heading (h1 uses the global display font) */}
            <h1 className="mt-2 text-4xl font-extrabold uppercase leading-[1.08] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px]">
              Car Repair &amp;
              <br />
              <span className="text-[#ff2a24]">Auto</span> Services
            </h1>

            {/* description */}
            <p className="mt-2 max-w-[540px] text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              Our skilled team of certified technicians is here to provide top-notch car repair
              and auto services to ensure your vehicle performs at its best.
            </p>

            {/* button */}
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-3 rounded-full bg-[#ff2a24] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-colors hover:bg-[#e01f1a] sm:px-10 sm:py-4 sm:text-base"
            >
              Book a Service
              <FiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}