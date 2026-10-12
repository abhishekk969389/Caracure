import Link from "next/link";
import SubBanner from "@/app/components/subbanner";

export default function NotFound() {
  return (
    <>
      <SubBanner pageKey="blogDetail" />
      <div className="mx-auto max-w-[1320px] px-4 py-20 text-center sm:px-6 lg:px-10 xl:px-6">
        <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#0d1f45]">
          Post Not Found
        </h2>
        <p className="mt-4 text-slate-600">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="mt-6 inline-block bg-[#e2232b] px-6 py-3 font-bold text-white uppercase hover:bg-[#c91d24]">
          Back to Blog
        </Link>
      </div>
    </>
  );
}
