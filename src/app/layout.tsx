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
        <div className="flex flex-col min-h-screen  bg-white dark:bg-gray-950">
        <main className="flex-grow container mx-auto py-6 space-y-8 px-2 md:px-12 lg:px-20">
          {children}
        </main>
        <Footer />
        </div>

        </ClientLayout>

      </body>
    </html>
  );
}
