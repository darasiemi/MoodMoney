import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = getProjectBySlug(slug);
    return { title: project.title, description: project.description };
  } catch {
    return {};
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="page-shell">
      <Link
        href="/research"
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-ucd-navy hover:bg-[color:var(--surface-subtle)] dark:text-ucd-navy-200 mb-10 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Research
      </Link>

      <div>
        {/* Header */}
        <div className="detail-intro grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          <div className="lg:col-span-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[color:var(--foreground)] leading-tight tracking-[-0.03em] mb-6">
            {project.title}
          </h1>
          <p className="content-copy text-lg leading-8 mb-6 max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div></div>

          <dl className="self-end divide-y divide-ucd-navy-100 rounded-xl border-2 border-ucd-navy border-t-4 border-t-ucd-gold bg-white px-6 shadow-[0_10px_24px_rgba(0,48,135,0.14)] dark:divide-[#2b4c76] dark:border-ucd-navy-200 dark:border-t-ucd-gold dark:bg-ucd-navy-900 lg:col-span-4">
            <div className="py-4 first:pt-5">
              <dt className="mb-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ucd-navy-700 dark:text-ucd-navy-200">
                Status
              </dt>
              <dd>
                <span className="inline-flex rounded-full bg-ucd-green-100 px-3 py-1 text-sm font-bold capitalize text-ucd-green dark:bg-ucd-green/25 dark:text-[#b9e4c0]">
                  {project.status}
                </span>
              </dd>
            </div>
            <div className="py-4">
              <dt className="mb-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ucd-navy-700 dark:text-ucd-navy-200">
                Period
              </dt>
              <dd className="text-base font-bold text-ucd-navy-900 dark:text-white">
                {project.startYear}–{project.endYear ?? "present"}
              </dd>
            </div>
            {project.funding && (
              <div className="py-4 last:pb-5">
                <dt className="mb-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ucd-navy-700 dark:text-ucd-navy-200">
                  Funding
                </dt>
                <dd className="break-words text-base font-semibold leading-6 text-ucd-navy-900 dark:text-white">
                  {Array.isArray(project.funding)
                    ? project.funding.join(", ")
                    : project.funding}
                </dd>
              </div>
            )}
            {project.collaborators && project.collaborators.length > 0 && (
              <div className="py-4 last:pb-5">
                <dt className="mb-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ucd-navy-700 dark:text-ucd-navy-200">
                  Collaborators
                </dt>
                <dd className="break-words text-base font-semibold leading-6 text-ucd-navy-900 dark:text-white">
                  {project.collaborators.join(", ")}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* MDX content */}
        <article className="prose dark:prose-invert max-w-3xl mx-auto">
          <MDXRemote source={project.content} />
        </article>
      </div>
    </div>
  );
}
