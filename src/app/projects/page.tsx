import { getProjects } from "@/lib/prisma/project";
import { metaMap } from "@/constants/pages-meta";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import Link from "next/link";
import { LinkIcon, Plus } from "lucide-react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProjectsPage() {
  const projects = await getProjects(10);
  const meta = metaMap["/projects"];
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
          <Link href="/projects/new">Add new project</Link>
        </div>
      )}
      <ul className="p-6 pt-8 pb-16 md:p-16 md:pt-8 md:mb-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.id}
            className="group relative flex flex-col items-start"
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.featureImage ?? "/images/avatar.jpg"}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
              <Link href={`/projects/${project.slug}`}>
                <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                <span className="relative z-10">{project.title}</span>
              </Link>
            </h2>
            <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition dark:text-zinc-200 items-center">
              <LinkIcon size={12} />{" "}
              <span className="ml-2">{project.projectUrl}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
