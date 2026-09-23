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

          <dl className="lg:col-span-4 self-end rounded-xl border border-[color:var(--border)] border-t-4 border-t-ucd-gold bg-[color:var(--surface)] p-6 text-sm shadow-sm">
            <div>
              <dt className="text-xs font-semibold text-[color:var(--muted)] mb-1">
                Status
              </dt>
              <dd className="text-base font-medium capitalize text-[color:var(--foreground)] mb-5">
                {project.status}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[color:var(--muted)] mb-1">
                Period
              </dt>
              <dd className="text-base font-medium text-[color:var(--foreground)] mb-5">
                {project.startYear}–{project.endYear ?? "present"}
              </dd>
            </div>
            {project.funding && (
              <div>
                <dt className="text-xs font-semibold text-[color:var(--muted)] mb-1">
                  Funding
                </dt>
                <dd className="text-base text-[color:var(--foreground)] mb-5">
                  {Array.isArray(project.funding)
                    ? project.funding.join(", ")
                    : project.funding}
                </dd>
              </div>
            )}
            {project.collaborators && project.collaborators.length > 0 && (
              <div>
                <dt className="text-xs font-semibold text-[color:var(--muted)] mb-1">
                  Collaborators
                </dt>
                <dd className="text-base text-[color:var(--foreground)]">
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
