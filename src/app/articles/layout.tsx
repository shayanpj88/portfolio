import { getUser } from "@/lib/prisma/user";
import { metaMap } from "@/constants/pages-meta";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const meta = metaMap["/articles"];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const user = await getUser();

  return {
    title:
      (meta?.pageTitle || "Articles") +
      " - " +
      user?.firstName +
      " " +
      user?.lastName,
    description: meta?.pageDescription || "Browse our latest articles.",
    openGraph: {
      title:
        (meta?.pageTitle || "Articles") +
        " - " +
        user?.firstName +
        " " +
        user?.lastName,
      description: meta?.pageDescription || "Browse our latest articles.",
      url: `${siteUrl}/articles`,
      images: [{ url: "/images/article.jpg" }],
    },
  };
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
