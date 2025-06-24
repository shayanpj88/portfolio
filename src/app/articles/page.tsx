import { getArticles } from "@/lib/prisma/article";
import { metaMap } from "@/constants/pages-meta";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const meta = metaMap["/articles"];
  const siteUrl = process.env.NEXR_PUBLIC_SITE_URL || "";

  return {
    title: meta.pageTitle,
    description: meta.pageDescription,
     openGraph: {
      title: meta.pageTitle,
      description: meta.pageDescription,
      url: `${siteUrl}/articles`,
      images: [{ url: '/images/avatar.jpg' }],
    },
  };
};

export default async function ArticlesPage() {
  const articles = await getArticles(10);

  return (
    <>
      {articles.map((article) => (
        <h1 key={article.id}>{article.title}</h1>
      ))}
    </>
  );
}
