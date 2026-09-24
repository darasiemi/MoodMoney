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
      <div className="-mx-4 mb-16 sm:-mx-8 sm:mb-20 lg:-mx-12 nm-ticker-band">
        <NewsTicker items={tickerItems} />
      </div>
      <FeaturedProjects projects={projects} />
      <RecentNews publications={publications} posts={posts} news={news} />
    </>
  );
}
