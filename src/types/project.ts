import { PrismaProject } from "./prisma";

export type ProjectForm = Omit<PrismaProject, "createdAt" | "updatedAt"> & {
  id: string;
  title: string;
  slug: string;
  description?: string;
  role: string;
  projectUrl: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  htmlContent?: string;
  featureImage?: string | null;
  authorId: string;
};
