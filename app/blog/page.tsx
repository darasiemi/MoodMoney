import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Research updates, perspectives, and accessible explainers from the Mood & Money Lab.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-ucd-navy dark:text-white mb-4 tracking-tight">
        Blog{" "}
        <span className="font-normal italic text-gray-400 dark:text-gray-500">from the lab.</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        Research updates, accessible explainers, and perspectives from the lab.
      </p>

      <div className="space-y-5 max-w-2xl">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative block bg-white dark:bg-[#071030] border border-ucd-navy-100 dark:border-[#0e2155] rounded-xl p-6 hover:border-ucd-green dark:hover:border-ucd-green hover:shadow-md transition-all overflow-hidden"
          >
            {/* Left bar — green on hover */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-ucd-navy group-hover:bg-ucd-green transition-colors rounded-l-xl" aria-hidden />

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{post.author}</span>
            </div>

            <h2 className="text-base font-bold text-ucd-navy dark:text-white group-hover:text-ucd-green dark:group-hover:text-ucd-green-100 transition-colors mb-2 leading-snug">
              {post.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
              {post.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              <ArrowRight
                size={15}
                className="text-ucd-navy-200 dark:text-[#0e2155] group-hover:text-ucd-green group-hover:translate-x-0.5 transition-all shrink-0"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
