import "@/styels/globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { Metadata } from "next";
import { getUser } from "@/lib/prisma/user";

export const viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getUser();

  if (!user) {
    return {
      title: "Home Page | My Portfolio",
      description: "This is my portfolio.",
    };
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    title: `${user.firstName} ${user.lastName} - Portfolio`,
    description: user.introductionTitle ?? "",

    openGraph: {
      title: `${user.firstName} ${user.lastName} Portfolio`,
      description: user.introductionTitle ?? "",
      url: `${siteUrl}`,
      siteName: "My Site",
      images: [{ url: `${user.profileImage}` }],
    },
    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        { url: "/favicon/icon.svg", type: "image/svg+xml" },
        { url: "/favicon/favicon-96x96.png", sizes: "96x96" },
        { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192" },
        { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png" }],
      other: [{ rel: "mask-icon", url: "favicon/icon.svg", color: "#5bbad5" }],
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="root-container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
