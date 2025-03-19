import type { Metadata } from "next";
import ClientLayout from '../components/ClientLayout';
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"


export const metadata: Metadata = {
  title: "devedu portfolio",
  description: "my personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ClientLayout>
      <Navbar />
        <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 px-2 md:px-12 lg:px-50 xl:px-60">
          {children}
        </main>
        <Footer />
        </ClientLayout>

      </body>
    </html>
  );
}
