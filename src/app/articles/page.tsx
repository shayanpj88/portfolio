import { getArticles } from "@/lib/prisma/article";

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
