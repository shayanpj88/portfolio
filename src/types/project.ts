import { PrismaProject } from "./prisma";

export type ProjectForm = Omit<PrismaProject, "createdAt" | "updatedAt"> & {
  id: string;
  title: string;
  slug: string;
  role: string;
  startedAt: Date | null;
  endedAt: Date | null;
  htmlContent?: string;
  featureImage?: string | null;
  authorId: string;
};
