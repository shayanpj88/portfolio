import About from "@/components/about/About";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import { getUser } from "@/lib/prisma/user";
import { metaMap } from "@/constants/pages-meta";


export default async function AboutPage() {
  const user = await getUser();
  const meta = metaMap["/about"];

  const aboutData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    bio: user?.bio ?? "",
    profileImage: user?.profileImage ?? "",
    social: user?.social ?? {},
  };

  return (
    <>
      <SectionHeader title={meta.pageTitle} />
      <section id="about" className="px-6 md:px-16 mb-6 md:mb-16 md:py-6">
        <About aboutData={aboutData} />
      </section>
    </>
  );
}
