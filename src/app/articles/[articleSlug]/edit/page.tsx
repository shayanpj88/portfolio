import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getArticle } from "@/lib/prisma/article";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import EditArticleForm from "@/components/article/EditArticleForm";

interface PageProps {
  params: Promise<{ articleSlug: string }>; 
}

export default async function ArticleEditPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const { articleSlug } = await params;
  const article = await getArticle(articleSlug);

  if (!article) {
    notFound();
  }

  const articleFormData = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    description: article.description ?? "",
    htmlContent: article.htmlContent ?? "",
    featureImage: article.featureImage ?? "",
    authorId: article.authorId,
  };

  return (
    <div className="flex flex-col items-start mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader title="Edit Article" />
      <section id="article-form" className="px-6 md:px-16 w-full">
        <EditArticleForm article={articleFormData} mode="edit" />
      </section>
    </div>
  );
}