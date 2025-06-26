import { ArticleDateFormatter } from "@/util/DateFormatter";
import { Link2 } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string | null;
  description?: string | null;
  date?: string | Date;
  url?: string | null;
}

export default function SectionHeader({
  title,
  description,
  date,
  url,
}: Props) {
  return (
    <header className="p-6 pt-8 md:p-16 md:pb-8 max-w-3xl ">
      {date && (
        <time
          dateTime={date?.toString()}
          className="order-first mb-6 flex items-center text-base text-zinc-400 dark:text-zinc-500"
        >
          {" "}
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
          <span className="ml-3">{ArticleDateFormatter(date)}</span>
        </time>
      )}

      <h1 className="text-3xl font-bold text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {title}
      </h1>
      {url && (
        <Link
          href={url}
          className=" mb-6 mt-6 flex items-center text-base text-zinc-600 dark:text-zinc-400 hover:text-fuchsia-800"
        >
          <Link2/>
          <span className="ml-3">{url}</span>
        </Link>
      )}
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </header>
  );
}
