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
    <div className="py-12">
      <Link
        href="/research"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Research
      </Link>

      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm">
            <div>
              <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Status
              </dt>
              <dd className="capitalize font-medium text-gray-900 dark:text-white">
                {project.status}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Period
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {project.startYear}–{project.endYear ?? "present"}
              </dd>
            </div>
            {project.funding && (
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Funding
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {project.funding}
                </dd>
              </div>
            )}
            {project.collaborators && project.collaborators.length > 0 && (
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Collaborators
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {project.collaborators.join(", ")}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* MDX content */}
        <article className="prose prose-gray dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
          <MDXRemote source={project.content} />
        </article>
      </div>
    </div>
  );
}
