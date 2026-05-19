import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { RecentNews } from "@/components/home/RecentNews";
import { getFeaturedProjects, getAllBlogPosts } from "@/lib/mdx";
import { getFeaturedPublications, getNewsItems } from "@/lib/data";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const publications = getFeaturedPublications();
  const posts = getAllBlogPosts();
  const news = getNewsItems();

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects} />
      <RecentNews publications={publications} posts={posts} news={news} />
    </>
  );
}
