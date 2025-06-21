
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import { getArticle } from "@/lib/prisma/article";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditArticleForm from "@/components/article/EditArticleForm";

export default async function ArticleEditPage({ params }: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // secure redirect if not logged in
  }

  const articleFormData = {
    id: "",
    title: "",
    slug: "",
    htmlContent: "",
    featureImage: "",
    authorId: "",
  };

  return (
    <section id="article-form" className="px-6 md:px-16 md:py-6">
      <SectionHeader title="New Article" />
      <EditArticleForm article={articleFormData} mode="new"/>
    </section>
  );
}
