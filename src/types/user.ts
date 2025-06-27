import { PrismaUser } from "./prisma";

export type UserForm = Omit<
  PrismaUser,
  "createdAt" | "updatedAt" | "password"
> & {
  bio?: string;
  introductionTitle?: string;
  introductionSummary?: string;
  profileImage?: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
};

export type AboutData = Omit<
  PrismaUser,
  | "createdAt"
  | "updatedAt"
  | "password"
  | "id"
  | "introductionTitle"
  | "introductionSummary"
  | "username"
> & {
  email?: string;
  bio?: string;
  profileImage?: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
};
