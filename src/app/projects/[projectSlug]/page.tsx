import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import { getProject } from "@/lib/prisma/project";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { ArticleDateFormatter } from "@/util/DateFormatter";

//add dynamic metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = await getProject(projectSlug);

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

export default async function ProjectPage({
  params,
}: {
  params: { projectSlug: string };
}) {
  const { projectSlug } = await params;
  const project = await getProject(projectSlug);

  if (!project) {
    notFound();
  }
  const session = await getServerSession(authOptions);

  // replace line break with html <br/> using regular expression
  project.htmlContent = project?.htmlContent.replace(/\n/g, "<br />");

  return (
    <div className="flex flex-col items-center mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader
        title={project.title}
        description={project.description}
        url={project.projectUrl}
      />
      <article id="project" className="px-6 md:px-16 ">
        <div className="flex flex-col gap-6">
          <Image
            width={728}
            height={486}
            src={project.featureImage ?? "/images/project.jpg"}
            alt={project.title}
          />

          <div className="flex gap-6 items-center justify-between text-zinc-600 dark:text-zinc-400">
            <p>{project.role}</p>
            <p>
              {ArticleDateFormatter(project.startedAt)} -{" "}
              {project.endedAt?.toDateString() || "Present"}
            </p>
          </div>

          <p className=" text-zinc-600 dark:text-zinc-400">
            {project.htmlContent}
          </p>

          {session && (
            <Link
              className="flex gap-1 items-center text-fuchsia-800"
              href={`/projects/${project.slug}/edit`}
            >
              <span>Edit Project</span>
              <ChevronRight size={12} />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
