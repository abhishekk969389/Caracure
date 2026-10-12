import { notFound } from "next/navigation";
import { getServiceBySlug, getServiceSlugs, site } from "@/data/index";
import SubBanner from "@/app/components/subbanner";
import ServiceDetailSection from "@/app/components/services/servicedetail";

export async function generateStaticParams() {
  const slugs = getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return { 
    title: `${service.title} | CarAcure`,
    description: service.description
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <SubBanner pageKey="serviceDetail" />
      <ServiceDetailSection service={service} />
    </>
  );
}
