import { getProject } from "@/lib/prisma/project";
import { notFound } from "next/navigation";

//add dynamic metadata for dynamic pages
export async function generateMetadata({ params }: any) {
  const project = await getProject(params.projectSlug);
  if (!project) {
    notFound();
  }
  return {
    title: project.title,
    description: project.htmlContent,
  };
}

export default async function ProjectPage({ params }: any) {
  const project = await getProject(params.projectSlug);

  if (!project) {
    notFound();
  }

  // replace line break with html <br/> using regular expression
  project.htmlContent = project?.htmlContent.replace(/\n/g, "<br />");

  return <h1>{project?.title}</h1>;
}
