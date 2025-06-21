import HeroSection from "@/components/home/HeroSection";
import ArticleSection from "@/components/home/ArticleSection";
import ProjectSection from "@/components/home/ProjectSection";
import StayUpdateSection from "@/components/home/StayUpdateSection";
import ImagesGallerySection from "@/components/home/ImagesGallerySection";

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
