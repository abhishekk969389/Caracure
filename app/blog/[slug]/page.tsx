import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogSlugs } from "@/data/index";
import SubBanner from "@/app/components/subbanner";
import BlogDetailSection from "@/app/components/blog/blogdetail";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Not Found" };
  return { 
    title: `${post.title} | CarAcure`,
    description: post.excerpt,
    openGraph: {
      images: [post.image]
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SubBanner pageKey="blogDetail" />
      <BlogDetailSection post={post} />
    </>
  );
}
