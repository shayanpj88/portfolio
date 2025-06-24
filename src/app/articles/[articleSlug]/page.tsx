import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import { getArticle } from "@/lib/prisma/article";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Metadata } from "next";

//add dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { articleSlug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.articleSlug);

  if (!article) {
    notFound();
  }

  return {
    title: article.title ?? "Article",
    description:
      article.description ??
      article.htmlContent?.slice(0, 160) ??
      "Read this article.",
    openGraph: {
      title: article.title,
      description: article.description ?? article.htmlContent?.slice(0, 160),
      images: article.featureImage ? [article.featureImage] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: any) {
  const article = await getArticle(params.articleSlug);

  if (!article) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  // replace line break with html <br/> using regular expression
  article.htmlContent = article?.htmlContent.replace(/\n/g, "<br />");

  return (
    <section id="about" className="px-6 md:px-16 md:py-6">
      <SectionHeader title={article.title} />
      <div className="flex flex-col gap-6">
        <Image
          width={728}
          height={486}
          src={article.featureImage || "/iamges/article.jpg"}
          alt={article.title}
        />
        <p className=" text-zinc-600 dark:text-zinc-400">
          {article.htmlContent}
        </p>
        <p className=" flex gap-3  text-zinc-600 dark:text-zinc-400">
          <span>{article.createdAt.toDateString()} </span>
          {session && (
            <Link href={`/articles/${article.slug}/edit`}>Edit Article</Link>
          )}
        </p>
      </div>
    </section>
  );
}
