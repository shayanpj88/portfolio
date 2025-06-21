import Link from "next/link";
import { icons } from "@/lib/icons";
import { getArticles } from "@/lib/prisma/article";

export default async function ArticleSection() {
  const articles = await getArticles(2);
  const ChevronRight = icons["chevronRight"];

  return (
    <div className="container flex flex-col py-6 md:px-10 gap-6">
      {articles.map((article) => (
        <article
          key={article.id}
          className="flex flex-col hover:bg-zinc-50 dark:hover:bg-zinc-800 p-6 rounded-2xl"
        >
          <Link href={`articles/${article?.slug}`} className="flex flex-col">
            <p className="border-l-1 order-first flex items-center text-sm text-zinc-400 pl-3.5">
              September 2, 2020
            </p>
            <h2 className="mt-4 text-zinc-900 dark:text-zinc-100">
              {article?.title}
            </h2>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 ">
              {article?.htmlContent}
            </p>
            <div className="mt-4 flex items-center text-sm gap-2 font-medium text-fuchsia-800 ">
              <p>Read article </p>
              <ChevronRight size={12} />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
