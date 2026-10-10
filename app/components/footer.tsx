import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandshake,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Appointment", href: "/appointment" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

const services = [
  { label: "Wheel Service", href: "/services/wheel-service" },
  { label: "Oil Change", href: "/services/oil-change" },
  { label: "Engine Repair", href: "/services/engine-repair" },
  { label: "Inspection Service", href: "/services/inspection-service" },
  { label: "Car Cleaning", href: "/services/car-cleaning" },
  { label: "Engine Cleaning", href: "/services/engine-cleaning" },
  { label: "Engine Upgrade", href: "/services/engine-upgrade" },
];

const socials = [
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "Twitter", href: "#", Icon: FaTwitter },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white sm:text-xl">{children}</h3>
      <span className="mt-3 block h-[3px] w-10 bg-[#e2232b]" />
    </div>
  );
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group inline-flex items-center gap-3 text-sm text-white/90 transition hover:text-[#e2232b] sm:text-base"
          >
            <FiChevronRight className="shrink-0 text-base" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14 text-white">
      {/* Background image: /public/footer.png */}
      <Image
        src="/footer.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12] via-[#0b0d12]/85 to-[#0b0d12]/20" />

      <div className="relative">
        {/* Main */}
        <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.4fr] lg:gap-8 lg:pr-10 xl:gap-10 xl:pr-20 2xl:pr-44">
            {/* About */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" aria-label="CarAcure home" className="inline-block">
                {/* Put your logo at /public/logo.png */}
                <Image
                  src="/main-logo.png"
                  alt="CarAcure - Car Repair & Service"
                  width={320}
                  height={90}
                  className="h-auto w-[220px] sm:w-[280px] lg:w-[300px]"
                />
              </Link>

              <p className="mt-5 max-w-[460px] text-sm leading-relaxed text-white/90 sm:text-base">
                We provide reliable and professional car repair and auto
                services to keep your vehicle running smoothly and safely on
                the road. Our skilled technicians are committed to delivering
                quality service and complete customer satisfaction.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 text-white transition hover:border-[#e2232b] hover:bg-[#e2232b]"
                  >
                    <Icon className="text-base" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <FooterHeading>Quick Links</FooterHeading>
              <LinkList items={quickLinks} />
            </div>

            {/* Our Services */}
            <div>
              <FooterHeading>Our Services</FooterHeading>
              <LinkList items={services} />
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-1">
              <FooterHeading>Contact Info</FooterHeading>

              <ul className="mt-5 space-y-4 text-sm sm:text-base">
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b]">
                    <FaPhoneAlt className="text-sm" />
                  </span>
                  <a href="tel:+919876543210" className="hover:text-[#e2232b]">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b]">
                    <FaEnvelope className="text-sm" />
                  </span>
                  <a
                    href="mailto:info@caracure.com"
                    className="break-all hover:text-[#e2232b]"
                  >
                    info@caracure.com
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2232b]">
                    <FaMapMarkerAlt className="text-sm" />
                  </span>
                  <address className="not-italic leading-snug">
                    123 Auto Street,
                    <br />
                    New Delhi, India - 110001
                  </address>
                </li>
              </ul>

              {/* Support box */}
              <div className="mt-5 flex w-full max-w-[420px] items-center gap-3 rounded-lg border border-[#e2232b]/60 bg-gradient-to-r from-[#5b0d13]/90 via-[#3a0b10]/90 to-[#1c0a0d]/90 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm xl:gap-4 xl:px-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e2232b] xl:h-14 xl:w-14">
                  <FaHandshake className="text-xl text-white xl:text-2xl" />
                </span>
                <span className="h-12 w-px shrink-0 bg-white/60 xl:h-14" />
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-[15px] font-bold leading-tight text-white xl:text-base">
                    24/7 Customer Support
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-white/90 xl:text-sm">
                    We&apos;re always here to help you with your vehicle needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1320px] px-4 py-5 text-center text-sm sm:px-6 sm:py-6 sm:text-base lg:px-10 xl:px-6">
            &copy; Copyrights {new Date().getFullYear()}{" "}
            <span className="text-[#e2232b]">CarAcure</span>. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}