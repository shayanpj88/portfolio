import type { Metadata } from "next";
import "@/styels/globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Shayanpj - Portfolio",
  description: "Designed by Shayan Panjeh Alizadeh",
};

export const viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
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
