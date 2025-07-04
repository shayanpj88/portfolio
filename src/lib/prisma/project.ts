import { prisma } from "@/lib/prisma";

export const getProjects = async (count: number) => {
    return await prisma.project.findMany({
        take: count,
        orderBy: {
            createdAt: 'desc', // Optional: Most recent first
        },
    });
};


export const getProject = async (projectSlug: string) => {
  return await prisma.project.findUnique({
    where: { slug: projectSlug },
  });
};
