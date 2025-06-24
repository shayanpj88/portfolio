import { getProjects } from "@/lib/prisma/project";
import { metaMap } from "@/constants/pages-meta";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const meta = metaMap["/projects"];
  const siteUrl = process.env.NEXR_PUBLIC_SITE_URL || "";

  return {
    title: meta.pageTitle,
    description: meta.pageDescription,
     openGraph: {
      title: meta.pageTitle,
      description: meta.pageDescription,
      url: `${siteUrl}/projects`,
      images: [{ url: '/images/avatar.jpg' }],
    },
  };
};

export default async function ArticlesPage() {
  const projects = await getProjects(10);

  return (
    <>
      {projects.map((project) => (
        <h1 key={project.id}>{project.title}</h1>
      ))}
    </>
  );
}
