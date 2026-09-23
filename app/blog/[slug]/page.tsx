import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogBySlug, getBlogSlugs } from "@/lib/mdx";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getBlogBySlug(slug);
    return { title: post.title, description: post.summary };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getBlogBySlug(slug);
  } catch {
    notFound();
  }

  if (!post.published) notFound();

  return (
    <div className="page-shell">
      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-ucd-navy hover:bg-[color:var(--surface-subtle)] dark:text-ucd-navy-200 mb-10 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Blog
      </Link>

      <div>
        {/* Header */}
        <div className="detail-intro max-w-5xl mb-12">
          <div className="content-copy flex flex-wrap items-center gap-3 text-sm mb-5">
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[color:var(--foreground)] tracking-[-0.03em] mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* MDX content */}
        <article className="prose dark:prose-invert max-w-3xl mx-auto">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}
