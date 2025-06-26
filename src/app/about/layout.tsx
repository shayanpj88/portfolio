import { Metadata } from "next";
import { getUser } from "@/lib/prisma/user";
import { metaMap } from "@/constants/pages-meta";

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getUser();
  const meta = metaMap["/about"];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return {
    title: meta.pageTitle + " - " + user?.firstName + " " + user?.lastName,
    description: meta.pageDescription,
    openGraph: {
      title: meta.pageTitle + " - " + user?.firstName + " " + user?.lastName,
      description: meta.pageDescription,
      url: `${siteUrl}/articles`,
      images: [{ url: "/images/avatar.jpg" }],
    },
  };
};


export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
