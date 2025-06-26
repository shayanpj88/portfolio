import { getUser } from "@/lib/prisma/user";
import { metaMap } from "@/constants/pages-meta";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const meta = metaMap["/projects"];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const user = await getUser();
  return {
    title:
      (meta?.pageTitle || "Projects") +
      " - " +
      user?.firstName +
      " " +
      user?.lastName,
    description: meta.pageDescription,
    openGraph: {
      title:
        (meta?.pageTitle || "Projects") +
        " - " +
        user?.firstName +
        " " +
        user?.lastName,
      description: meta.pageDescription,
      url: `${siteUrl}/projects`,
      images: [{ url: "/images/project.jpg" }],
    },
  };
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}