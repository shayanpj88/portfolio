import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import { getProject } from "@/lib/prisma/project";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditProjectForm from "@/components/project/EditProjectForm";

export default async function ProjectEditPage({ params }: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // secure redirect if not logged in
  }

  const project = await getProject(params.projectSlug);

  if (!project) {
    notFound();
  }

  const projectFormData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description ?? "",
    role: project.role,
    startedAt: project.startedAt ?? null,
    endedAt: project.endedAt ?? null,
    htmlContent: project.htmlContent ?? "",
    featureImage: project.featureImage ?? "",
    authorId: project.authorId,
  };

  return (
    <section id="project-form" className="px-6 md:px-16 md:py-6">
      <SectionHeader title="Edit Project" />
      <EditProjectForm project={projectFormData} mode="edit" />
    </section>
  );
}
