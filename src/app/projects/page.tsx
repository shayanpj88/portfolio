import { getProjects } from "@/lib/prisma/project";

export default async function ArticlesPage() {
  const projects = await getProjects(10);

  return (
    <>
      {projects.map((project) => (
        <h1 key={project.id}>{project.title}</h1>
      ))}
    </>
  );
}
