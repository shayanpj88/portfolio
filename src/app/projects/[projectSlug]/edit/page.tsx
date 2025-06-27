import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getProject } from "@/lib/prisma/project";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditProjectForm from "@/components/project/EditProjectForm";

interface Props {
  params: Promise<{ projectSlug: string }>;
} 

export default async function ProjectEditPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("auth/login");
  }

  const {projectSlug} = await params;
  const project = await getProject(projectSlug);

  if (!project) {
    notFound();
  }

  const projectFormData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description ?? "",
    role: project.role,
    projectUrl: project.projectUrl ?? "",
    startedAt: project.startedAt ?? null,
    endedAt: project.endedAt ?? null,
    htmlContent: project.htmlContent ?? "",
    featureImage: project.featureImage ?? "",
    authorId: project.authorId,
  };

  return (
    <div className="flex flex-col items-start mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader title="Edit Project" />
      <section id="project-form" className="px-6 md:px-16 w-full">
        <EditProjectForm project={projectFormData} mode="edit" />
      </section>
    </div>
  );
}
