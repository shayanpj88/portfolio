
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditArticleForm from "@/components/article/EditArticleForm";

export default async function ArticleEditPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login"); // secure redirect if not logged in
  }

  const articleFormData = {
    id: "",
    title: "",
    slug: "",
    description: "",
    htmlContent: "",
    featureImage: "",
    authorId: "",
  };

  return (
    <div className="flex flex-col items-start mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader title="New Article" />
      <section id="article-form" className="px-6 md:px-16 w-full">
        <EditArticleForm article={articleFormData} mode="new" />
      </section>
    </div>
  );
}
