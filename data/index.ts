import carData from "./car.json";

const sec = carData.CaracureIndustries.sections;

export type CaracureBrandData = typeof sec.Brand.variants.CaracureBrand1;
export type CaracureTopBarData = typeof sec.TopBar.variants.CaracureTopBar1;
export type CaracureHeaderData = typeof sec.Header.variants.CaracureHeader1;
export type CaracureBannerData = typeof sec.Banner.variants.CaracureBanner1;
export type CaracureAboutSectionData = typeof sec.AboutSection.variants.CaracureAboutSection1;
export type CaracureServicesData = typeof sec.Services.variants.CaracureServices1;
export type CaracureHelpData = typeof sec.Help.variants.CaracureHelp1;
export type CaracureTeamData = typeof sec.Team.variants.CaracureTeam1;
export type CaracureTestimonialData = typeof sec.Testimonial.variants.CaracureTestimonial1;
export type CaracureBlogData = typeof sec.Blog.variants.CaracureBlog1;
export type CaracureFooterData = typeof sec.Footer.variants.CaracureFooter1;
export type CaracureSubBannersData = typeof sec.SubBanners.variants.CaracureSubBanners1;
export type SubBannerKey = keyof CaracureSubBannersData;
export type CaracureWhyChooseUsData = typeof sec.WhyChooseUs.variants.CaracureWhyChooseUs1;
export type CaracureGalleryPageData = typeof sec.GalleryPage.variants.CaracureGalleryPage1;
export type CaracureFaqPageData = typeof sec.FaqPage.variants.CaracureFaqPage1;
export type CaracureContactPageData = typeof sec.ContactPage.variants.CaracureContactPage1;

export const site = {
  brand: sec.Brand.variants.CaracureBrand1,
  topBar: sec.TopBar.variants.CaracureTopBar1,
  navbar: sec.Header.variants.CaracureHeader1,
  banner: sec.Banner.variants.CaracureBanner1,
  about: sec.AboutSection.variants.CaracureAboutSection1,
  ourServices: sec.Services.variants.CaracureServices1,
  help: sec.Help.variants.CaracureHelp1,
  ourTeam: sec.Team.variants.CaracureTeam1,
  testimonials: sec.Testimonial.variants.CaracureTestimonial1,
  ourBlogs: sec.Blog.variants.CaracureBlog1,
  footer: sec.Footer.variants.CaracureFooter1,
  subBanners: sec.SubBanners.variants.CaracureSubBanners1,
  whyChooseUs: sec.WhyChooseUs.variants.CaracureWhyChooseUs1,
  galleryPage: sec.GalleryPage.variants.CaracureGalleryPage1,
  faqPage: sec.FaqPage.variants.CaracureFaqPage1,
  contactPage: sec.ContactPage.variants.CaracureContactPage1,
};

export function getServiceBySlug(slug: string) {
  return site.ourServices.services.find((s) => s.slug === slug);
}

export function getServiceSlugs() {
  return site.ourServices.services.map((s) => s.slug);
}

export function getBlogBySlug(slug: string) {
  return site.ourBlogs.posts.find((p) => p.href === `/blog/${slug}`);
}

export function getBlogSlugs() {
  return site.ourBlogs.posts.map((p) => p.href.replace('/blog/', ''));
}

export default carData;
