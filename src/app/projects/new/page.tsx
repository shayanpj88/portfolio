
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/prisma/project";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditProjectForm from "@/components/project/EditProjectForm";

export default async function ArticleEditPage({ params }: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // secure redirect if not logged in
  }

  const projectFormData = {
    id: "",
    title:  "",
    slug: "",
    description: "",
    role: "",
    startedAt: null,
    endedAt: null,
    htmlContent:  "",
    featureImage:  "",
    authorId: "",
  };

  return (
    <section id="project-form" className="px-6 md:px-16 md:py-6">
      <SectionHeader title="New Project" />
      <EditProjectForm project={projectFormData} mode="new"/>
    </section>
  );
}
