import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditProjectForm from "@/components/project/EditProjectForm";



export default async function ArticleEditPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("auth/login");
  }

  const projectFormData = {
    id: "",
    title: "",
    slug: "",
    description: "",
    role: "",
    projectUrl: "",
    startedAt: null,
    endedAt: null,
    htmlContent: "",
    featureImage: "",
    authorId: "",
  };

  return (
    <div className="flex flex-col items-start mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader title="New Project" />
      <section id="project-form" className="px-6 md:px-16 w-full">
        <EditProjectForm project={projectFormData} mode="new" />
      </section>
    </div>
  );
}
