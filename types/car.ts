export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  bg?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export interface FeatureItem {
  title: string;
  text: string;
  icon: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  text: string;
  image: string;
  description?: string;
  included?: string[];
  processIntro?: string;
  process?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  slug?: string;
  bio?: string[];
  email?: string;
  phone?: string;
  phoneHref?: string;
  socials?: SocialLink[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  images?: string[];
  quote?: string;
}

export interface BlogPostItem {
  id: number;
  day: string;
  month: string;
  title: string;
  excerpt: string;
  author: string;
  comments: number;
  favorites: number;
  image: string;
  href: string;
  date?: string;
  intro?: string;
  sections?: BlogSection[];
  outro?: string;
  tags?: string[];
  category?: string;
}

export interface SectionProps<T> {
  data?: T;
  className?: string;
  variant?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}
