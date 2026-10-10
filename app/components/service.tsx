import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const unsplash = (id: string, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

type Service = {
  slug: string;
  title: string;
  text: string;
  image: string;
};

// Replace the photo IDs with your own Unsplash photos
const services: Service[] = [
  {
    slug: "wheel-service",
    title: "Wheel Service",
    text: "Professional wheel service for better performance and safety on the road.",
    image: unsplash("1600861194942-f883de0dfe96"),
  },
  {
    slug: "oil-change",
    title: "Oil Change",
    text: "Keep your engine healthy with our quick and reliable oil change service.",
    image: unsplash("1635784063388-1ff609efc1b3"),
  },
  {
    slug: "engine-repair",
    title: "Engine Repair",
    text: "Expert engine repair to restore power and performance efficiently.",
    image: unsplash("1530046339160-ce3e530c7d2f"),
  },
  {
    slug: "inspection-service",
    title: "Inspection Service",
    text: "Complete vehicle inspection to ensure your car is safe and road ready.",
    image: unsplash("1486262715619-67b85e0b08d3"),
  },
  {
    slug: "car-cleaning",
    title: "Car Cleaning",
    text: "Professional car cleaning services to keep your vehicle fresh and spotless.",
    image: unsplash("1520340356584-f9917d1eea6f"),
  },
  {
    slug: "engine-cleaning",
    title: "Engine Cleaning",
    text: "Thorough engine cleaning for improved efficiency and longer life.",
    image: unsplash("1492144534655-ae79c964c9d7"),
  },
  {
    slug: "engine-upgrade",
    title: "Engine Upgrade",
    text: "Upgrade your engine for better power, performance and fuel efficiency.",
    image: unsplash("1568605117036-5fe5e7bab0b7"),
  },
  {
    slug: "brake-checkup",
    title: "Brake Checkup",
    text: "Complete brake checkup for a safer and smoother driving experience.",
    image: unsplash("1619642751034-765dfdf7c58e"),
  },
];

export default function ServicesSection() {
  return (
    <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Heading (centered) */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
              Our Services
            </p>
          </div>

          {/* h2 uses the global display font */}
          <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            Our <span className="text-[#e2232b]">Services</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            We provide a complete range of car repair and auto services to keep your vehicle
            running smoothly and safely on the road.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col rounded-lg bg-white p-3 shadow-[0_4px_22px_rgba(15,31,75,0.07)] ring-1 ring-gray-100 transition-shadow duration-300 hover:shadow-[0_10px_34px_rgba(15,31,75,0.14)] sm:p-3.5"
            >
              {/* image */}
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-slate-200">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* content */}
              <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                <h3 className="text-base font-bold leading-tight text-[#0d1f45] transition-colors group-hover:text-[#e2232b] sm:text-lg">
                  {service.title}
                </h3>

                <div className="mt-2 flex flex-1 items-center gap-3">
                  <p className="flex-1 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
                    {service.text}
                  </p>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-[#e2232b] transition-colors duration-300 group-hover:bg-[#e2232b] group-hover:text-white">
                    <FaArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}