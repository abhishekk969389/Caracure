import SubBanner from "@/app/components/subbanner";
import LatestNews from "@/app/components/blog";

export default function BlogPage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="blog" />
      <LatestNews isPaginated={true} />
    </main>
  );
}
