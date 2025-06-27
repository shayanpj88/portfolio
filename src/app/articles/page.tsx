import { getArticles } from "@/lib/prisma/article";
import { metaMap } from "@/constants/pages-meta";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import Link from "next/link";
import { ArticleDateFormatter } from "../../util/DateFormatter";
import { ChevronRight, Plus } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ArticlesPage() {
  const meta = metaMap["/articles"];
  const articles = await getArticles(10);
  const session = await getServerSession(authOptions);

  return (
    <>
      <SectionHeader
        title={meta.pageTitle}
        description={meta.pageDescription}
      />

      {session && (
        <div className="flex w-fit gap-3 p-6 pt-8 pb-8 md:p-16 md:pt-8 text-zinc-600 dark:text-zinc-400 hover:text-fuchsia-800">
          <Plus />
          <Link href="/articles/new">Add new article</Link>
        </div>
      )}

      {articles.map((article) => (
        <div
          key={article.id}
          className="p-6 pt-8 pb-8 md:p-16 md:pt-8 last:mb-20"
        >
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
              <article className="md:grid md:grid-cols-4 md:items-baseline">
                <div className="md:col-span-3 group relative flex flex-col items-start">
                  <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
                    <Link href={`/articles/${article.slug}`} className="">
                      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span className="relative z-10">{article.title}</span>
                    </Link>
                  </h2>
                  <time
                    dateTime={article.createdAt.toDateString()}
                    className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center">
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    {ArticleDateFormatter(article.createdAt)}
                  </time>
                  <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {article.description}
                  </p>
                  <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-fuchsia-800 gap-1">
                    <span>Read article </span>
                    <ChevronRight size={12} />
                  </div>
                </div>
                <time
                  dateTime=""
                  className="mt-1 max-md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
                >
                  {ArticleDateFormatter(article.createdAt)}
                </time>
              </article>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
