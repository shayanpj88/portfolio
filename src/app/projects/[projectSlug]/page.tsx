import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import { getProject } from "@/lib/prisma/project";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

//add dynamic metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const project = await getProject(params.projectSlug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title ?? "Project",
    description:
      project.description ??
      project.htmlContent?.slice(0, 160) ??
      "Read about this project.",
    openGraph: {
      title: project.title,
      description: project.description ?? project.htmlContent?.slice(0, 160),
      images: project.featureImage ? [project.featureImage] : [],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: any) {
  const project = await getProject(params.projectSlug);

  if (!project) {
    notFound();
  }
  const session = await getServerSession(authOptions);

  // replace line break with html <br/> using regular expression
  project.htmlContent = project?.htmlContent.replace(/\n/g, "<br />");

  return (
    <section id="about" className="px-6 md:px-16 md:py-6">
      <SectionHeader title={project.title} />
      <div className="flex flex-col gap-6">
        <Image
          width={728}
          height={486}
          src={project.featureImage || "/iamges/project.jpg"}
          alt={project.title}
        />
        <p className=" text-zinc-600 dark:text-zinc-400">
          {project.htmlContent}
        </p>
        <p className=" flex gap-3  text-zinc-600 dark:text-zinc-400">
          <span>{project.createdAt.toDateString()} </span>
          {session && (
            <Link href={`/projects/${project.slug}/edit`}>Edit Project</Link>
          )}
        </p>
      </div>
    </section>
  );
}
