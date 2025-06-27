import Link from "next/link";
import { icons } from "@/lib/icons";
import { getProjects } from "@/lib/prisma/project";
import Image from "next/image";

export default async function ProjectSection() {
  const projects = await getProjects(3);
  const WorkIcon = icons["luggage"];
  const ArrowDown = icons["arrowDown"];
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="flex space-x-3 text-sm items-center font-semibold text-zinc-900 dark:text-zinc-100">
        <WorkIcon className="text-zinc-500" /> <h2>Work</h2>
      </div>
      <ol className="mt-6 space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                className="h-7 w-7 rounded-full"
                alt="work"
                src={project.featureImage ?? "/images/project.jpg"}
                width={21}
                height={21}
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <Link href={`projects/${project.slug}`}> {project.title}</Link>
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {project.role}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                <time dateTime={project.startedAt?.toISOString()}>
                  {project.startedAt?.toLocaleDateString("en-US", {
                    year: "numeric",
                  })}
                </time>{" "}
                -{" "}
                <time dateTime={project.endedAt?.toISOString()}>
                  {project.endedAt
                    ? new Date(project.endedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                      })
                    : "Present"}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Link
        href="/uploads/Shayan Panjeh Alizadeh - Resume.pdf"
        className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
      >
        Download CV <ArrowDown size={14} />
      </Link>
    </div>
  );
}
