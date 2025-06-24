import About from "@/components/about/About";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import { getUser } from "@/lib/prisma/user";
import { metaMap } from "@/constants/pages-meta";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const meta = metaMap["/articles"];
  const siteUrl = process.env.NEXR_PUBLIC_SITE_URL || "";

  return {
    title: meta.pageTitle,
    description: meta.pageDescription,
     openGraph: {
      title: meta.pageTitle,
      description: meta.pageDescription,
      url: `${siteUrl}/articles`,
      images: [{ url: '/images/avatar.jpg' }],
    },
  };
};

export default async function AboutPage() {


  const user = await getUser();


  const aboutData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    bio: user?.bio ?? "",
    profileImage: user?.profileImage ?? "",
    social: user?.social ?? {},
  };


  return (
      <section
      id="about"
      className="px-6 md:px-16 md:py-6"
    >
      <SectionHeader title="About" />
      <About aboutData={aboutData}/>
    </section>
  
  );
}

