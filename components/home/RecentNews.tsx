import Link from "next/link";
import { PublicationCard } from "@/components/publications/PublicationCard";
import type { Publication, BlogPost } from "@/types";

interface RecentNewsProps {
  publications: Publication[];
  posts: BlogPost[];
}

export function RecentNews({ publications, posts }: RecentNewsProps) {
  return (
    <section className="mb-16">
      <h2 className="section-heading text-2xl font-bold text-ucd-navy dark:text-white mb-8">
        Recent News{" "}
        <span className="font-normal italic text-gray-400 dark:text-gray-500">&amp; publications.</span>
      </h2>

      {/* Recent blog posts */}
      {posts.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-ucd-navy-700 dark:text-ucd-navy-200 mb-4">
            Latest from the blog
          </h3>
          <div className="space-y-3">
            {posts.slice(0, 2).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-4 p-4 bg-white dark:bg-[#071030] border border-ucd-navy-100 dark:border-[#0e2155] rounded-xl hover:border-ucd-green dark:hover:border-ucd-green hover:shadow-sm transition-all"
              >
                {/* Green date accent */}
                <div className="shrink-0 w-14 text-center pt-0.5">
                  <span className="block text-lg font-extrabold text-ucd-green dark:text-ucd-green-100 leading-none">
                    {new Date(post.date).toLocaleDateString("en-GB", { month: "short" })}
                  </span>
                  <span className="block text-xs text-ucd-navy-700 dark:text-ucd-navy-200 font-medium">
                    {new Date(post.date).getFullYear()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ucd-navy dark:text-white group-hover:text-ucd-green dark:group-hover:text-ucd-green-100 transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {post.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured publications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-ucd-navy-700 dark:text-ucd-navy-200">
            Featured publications
          </h3>
          <Link
            href="/publications"
            className="text-sm font-medium text-ucd-green dark:text-ucd-green-100 hover:text-ucd-green/80 dark:hover:text-ucd-green transition-colors"
          >
            All publications &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {publications.slice(0, 2).map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
}
