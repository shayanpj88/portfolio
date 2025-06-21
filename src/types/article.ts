import { PrismaArticle } from "./prisma";

// export type Article = Omit<
//   PrismaArticle,
//   "createdAt" | "updatedAt" | "password" | "authorId"
// > & {
//   id?: string;
//   title?: string;
//   slug?: string;
//   featureImage?: string;
// };

export type ArticleForm = Omit<PrismaArticle, "createdAt" | "updatedAt"> & {
  id: string;
  title: string;
  slug: string;
  htmlContent?: string;
  featureImage?: string | null;
  authorId: string;
};
