import Link from "next/link";
import { PublicationCard } from "@/components/publications/PublicationCard";
import type { Publication, BlogPost, NewsItem } from "@/types";

interface RecentNewsProps {
  publications: Publication[];
  posts: BlogPost[];
  news: NewsItem[];
}

export function RecentNews({ publications, posts, news }: RecentNewsProps) {
  return (
    <section className="mb-24 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm sm:p-8">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="relative self-start overflow-hidden rounded-2xl bg-ucd-navy p-6 sm:p-8 lg:col-span-4">
        <span className="absolute left-0 top-0 h-1.5 w-full bg-ucd-gold" aria-hidden />
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Recent News <span className="font-normal italic text-ucd-navy-200">&amp; publications.</span>
        </h2>
      </div>

      <div className="lg:col-span-8">

      {/* Latest news items */}
      {news.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-ucd-navy dark:text-white mb-3 pb-3 border-b-2 border-ucd-gold">
            Latest news
          </h3>
          <div>
            {news.map((item) => {
              const d = new Date(item.date);
              const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              return (
                <div key={item.id} className="grid sm:grid-cols-[8rem_1fr] gap-2 sm:gap-6 py-4 border-b border-[color:var(--border)]">
                  <time dateTime={item.date} className="shrink-0 text-sm font-semibold text-ucd-navy dark:text-ucd-navy-200">{dateStr}</time>
                  <p
                    className="news-copy text-sm sm:text-base leading-7"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent blog posts */}
      {posts.length > 0 && (
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-ucd-navy dark:text-white">
              Latest from the blog
            </h3>
            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-ucd-navy underline decoration-2 underline-offset-4 transition-colors hover:text-ucd-navy-700 dark:text-ucd-navy-200"
            >
              All blog posts <span aria-hidden>&rarr;</span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {posts.slice(0, 2).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="clickable-surface group flex items-start gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
              >
                {/* Green date accent */}
                <div className="shrink-0 w-14 text-center pt-0.5">
                  <span className="block text-lg font-bold text-ucd-navy dark:text-ucd-navy-200 leading-none">
                    {new Date(post.date).toLocaleDateString("en-GB", { month: "short" })}
                  </span>
                  <span className="block text-xs text-ucd-navy-700 dark:text-ucd-navy-200 font-medium">
                    {new Date(post.date).getFullYear()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[color:var(--foreground)] group-hover:text-ucd-navy dark:group-hover:text-ucd-navy-200 transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className="content-copy text-sm mt-1 line-clamp-2">
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
          <h3 className="text-lg font-semibold text-ucd-navy dark:text-white">
            Featured publications
          </h3>
          <Link
            href="/publications"
            className="text-sm font-semibold text-ucd-navy underline decoration-2 underline-offset-4 hover:text-ucd-navy-700 dark:text-ucd-navy-200 transition-colors"
          >
            All publications &rarr;
          </Link>
        </div>
        <div className="mt-4 space-y-4">
          {publications.slice(0, 2).map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
