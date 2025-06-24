import HeroSection from "@/components/home/HeroSection";
import ArticleSection from "@/components/home/ArticleSection";
import ProjectSection from "@/components/home/ProjectSection";
import StayUpdateSection from "@/components/home/StayUpdateSection";
import ImagesGallerySection from "@/components/home/ImagesGallerySection";
import type { Metadata } from "next";
import { getUser } from "@/lib/prisma/user";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUser();

  if (!user) {
    return {
      title: "Home Page | My Portfolio",
      description: "This is my portfolio.",
    };
  }

  const siteUrl = process.env.NEXR_PUBLIC_SITE_URL || "";

  return {
    title: `${user.firstName} ${user.lastName} Portfolio`,
    description: user.introductionTitle ?? "",

    openGraph: {
      title: `${user.firstName} ${user.lastName} Portfolio`,
      description: user.introductionTitle ?? "",
      url: `${siteUrl}`,
      siteName: "My Site",
      images: [{ url: `${user.profileImage}` }],
    },
  };
}

export default async function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Images Gallery section */}
      <section id="images">
        <ImagesGallerySection />
      </section>

      {/* articles and asides grid */}
      <div className="grid md:grid-cols-2 md:py-4 ">
        {/* Articles section */}
        <section id="articles">
          <ArticleSection />
        </section>

        {/* Stay up to date and work section */}
        <aside>
          <div className="container flex flex-col gap-10 p-6 pb-36 md:px-16 md:mt-5 ">
            <div id="email" className="flex flex-col ">
              <StayUpdateSection />
            </div>
            <div id="works" className="flex flex-col">
              <ProjectSection />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
