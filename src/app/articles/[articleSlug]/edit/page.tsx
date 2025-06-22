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

  const article = await getArticle(params.articleSlug);

  if (!article) {
    notFound();
  }

  const articleFormData = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    htmlContent: article.htmlContent ?? "",
    featureImage: article.featureImage ?? "",
    authorId: article.authorId,
  };

  return (
    <section id="article-form" className="px-6 md:px-16 md:py-6">
      <SectionHeader title="Edit Article" />
      <EditArticleForm article={articleFormData} mode="edit"/>
    </section>
  );
}
