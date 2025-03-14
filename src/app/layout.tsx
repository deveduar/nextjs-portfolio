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
        <main className="flex-grow  flex flex-col min-h-screen  bg-gray-100 dark:bg-gray-950 py-6 justify-center">
          {children}
        </main>
        <Footer />
        </ClientLayout>

      </body>
    </html>
  );
}
