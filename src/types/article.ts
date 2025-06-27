import { PrismaArticle } from "./prisma";

export type ArticleForm = Omit<PrismaArticle, "createdAt" | "updatedAt"> & {
  id: string;
  title: string;
  slug: string;
  description? :string;
  htmlContent?: string;
  featureImage?: string | null;
  authorId: string;
};
