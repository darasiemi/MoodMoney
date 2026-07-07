import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { RecentNews } from "@/components/home/RecentNews";
import { getFeaturedProjects, getAllBlogPosts } from "@/lib/mdx";
import { getFeaturedPublications, getNewsItems, getTickerItems } from "@/lib/data";
import { NewsTicker } from "@/components/layout/NewsTicker";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const publications = getFeaturedPublications();
  const posts = getAllBlogPosts();
  const news = getNewsItems();
  const tickerItems = getTickerItems();

  return (
    <>
      <Hero />
      <div
        className="-mx-4 sm:-mx-6 lg:-mx-8 mb-10"
        style={{
          backgroundColor: "#4a9960",
          paddingTop: "12px",
          paddingBottom: "12px",
          overflow: "hidden",
        }}
      >
        <NewsTicker items={tickerItems} />
      </div>
      <FeaturedProjects projects={projects} />
      <RecentNews publications={publications} posts={posts} news={news} />
    </>
  );
}
