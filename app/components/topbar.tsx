import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";

const ADDRESS = "123 Auto Street, New Delhi, India";
const PHONE_LABEL = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";

const socials: { label: string; href: string; Icon: IconType }[] = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
];

export default function TopBar() {
  return (
    <div className="w-full bg-gradient-to-r from-[#0a1a3f] via-[#102c61] to-[#0a1a3f] text-white">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-10 xl:px-6">
        {/* LEFT: address */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <FaMapMarkerAlt className="h-4 w-4 shrink-0 text-[#ff3b30] sm:h-[18px] sm:w-[18px]" />
            <address className="truncate text-xs not-italic text-white/90 sm:text-sm md:text-base">
              {ADDRESS}
            </address>
          </div>
          <span className="hidden h-5 w-px bg-white/20 sm:block" />
        </div>

        {/* RIGHT: phone + socials */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-xs text-white/90 transition-colors hover:text-white sm:text-sm md:text-base"
          >
            <FaPhoneAlt className="h-3.5 w-3.5 text-[#ff3b30] sm:h-4 sm:w-4" />
            <span>{PHONE_LABEL}</span>
          </a>

          <span className="hidden h-5 w-px bg-white/20 sm:block" />

          <ul className="hidden items-center gap-4 sm:flex lg:gap-5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block text-white transition-colors hover:text-[#f26a0f]"
                >
                  <Icon className="h-[20px] w-[20px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}