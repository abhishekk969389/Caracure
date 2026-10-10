import Image from "next/image";
import Link from "next/link";
import { FaUser, FaComment, FaHeart, FaArrowRight } from "react-icons/fa";

type Post = {
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
};

const posts: Post[] = [
  {
    id: 1,
    day: "21",
    month: "MAR",
    title: "Essential Tips to Keep Your Car in Top Condition",
    excerpt:
      "Learn simple and effective car maintenance tips to improve performance, safety and extend the life of your vehicle.",
    author: "Admin",
    comments: 8,
    favorites: 12,
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=900&h=760&q=80",
    href: "/blog/essential-tips-to-keep-your-car-in-top-condition",
  },
  {
    id: 2,
    day: "25",
    month: "MAR",
    title: "Why Regular Oil Change is Important for Your Car",
    excerpt:
      "Find out how regular oil changes help your engine run smoothly, improve fuel efficiency and prevent costly repairs.",
    author: "Admin",
    comments: 10,
    favorites: 12,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&h=760&q=80",
    href: "/blog/why-regular-oil-change-is-important",
  },
  {
    id: 3,
    day: "28",
    month: "MAR",
    title: "Signs Your Car Needs Immediate Servicing",
    excerpt:
      "Know the common warning signs that indicate your car needs professional attention to avoid major breakdowns.",
    author: "Admin",
    comments: 15,
    favorites: 12,
    image:
      "https://images.unsplash.com/photo-1632823471565-1ecdf5c6da05?auto=format&fit=crop&w=900&h=760&q=80",
    href: "/blog/signs-your-car-needs-immediate-servicing",
  },
];

export default function LatestNews() {
  return (
    <section className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[3px] w-10 bg-[#e2232b] sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600 sm:text-sm">
              Our Blog
            </p>
          </div>

          <h2 className="text-3xl font-extrabold uppercase text-[#0d1f45] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px]">
            Latest <span className="text-[#e2232b]">News</span>
          </h2>

          <p className="mx-auto max-w-[640px] text-sm leading-relaxed text-slate-600 sm:text-base">
            Stay updated with our latest tips, service updates and expert advice
            to keep your vehicle in the best condition.
          </p>
        </div>

        {/* Cards: 1 col mobile, 2 col md, 3 col lg+ */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex h-full flex-col rounded-md bg-white p-4 shadow-[0_8px_30px_rgba(13,31,69,0.08)] sm:p-5"
            >
              {/* Image + date badge */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 flex h-[60px] w-[68px] flex-col items-center justify-center bg-[#e2232b] leading-tight text-white sm:h-[68px] sm:w-[76px]">
                  <span className="text-xl font-extrabold sm:text-2xl">
                    {post.day}
                  </span>
                  <span className="text-xs font-medium sm:text-sm">
                    {post.month}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg font-extrabold leading-snug text-[#0d1f45] sm:text-xl">
                <Link href={post.href} className="hover:text-[#e2232b]">
                  {post.title}
                </Link>
              </h3>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <FaUser className="text-[#0d1f45]" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <FaComment className="text-[#0d1f45]" />
                  Comments: {post.comments}
                </span>
                <span className="flex items-center gap-2">
                  <FaHeart className="text-[#0d1f45]" />
                  Favorite: {post.favorites}
                </span>
              </div>

              {/* Excerpt */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                {post.excerpt}
              </p>

              {/* Read more */}
              <Link
                href={post.href}
                className="group mt-5 inline-flex w-fit items-center gap-3 font-medium text-[#e2232b]"
              >
                Read More
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2232b]/10 transition group-hover:bg-[#e2232b] group-hover:text-white">
                  <FaArrowRight className="text-sm" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}