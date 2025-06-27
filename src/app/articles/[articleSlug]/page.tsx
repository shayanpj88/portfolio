import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import { getArticle } from "@/lib/prisma/article";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ articleSlug: string }>;
}

//add dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = await getArticle(articleSlug);

  if (!article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: article.title || "Article",
    description:
      article.description ??
      article.htmlContent?.slice(0, 160) ??
      "Read this article.",
    openGraph: {
      title: article.title || "Article",
      description: article.description ?? article.htmlContent?.slice(0, 160),
      images: article.featureImage ? [`${siteUrl}${article.featureImage}`] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { articleSlug } = await params;
  const article = await getArticle(articleSlug);

  if (!article) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader
        title={article.title}
        description={article.description}
        date={article.createdAt}
      />
      <article id="article" className="px-6 md:px-16 ">
        <div className="flex flex-col gap-6">
          <Image
            width={728}
            height={486}
            src={article.featureImage || "/images/article.jpg"}
            alt={article.title}
          />
          <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-400">
            {article.htmlContent}
          </p>

          {session && (
            <Link
              className="flex gap-1 items-center text-fuchsia-800"
              href={`/articles/${article.slug}/edit`}
            >
              <span>Edit Article</span>
              <ChevronRight size={12} />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
