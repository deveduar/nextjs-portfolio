import type { Metadata } from "next";
import ClientLayout from '../components/ClientLayout';
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SearchProvider } from "@/components/navbar";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ClientLayout>
        <SearchProvider>
          <Navbar />
          <main className="min-h-screen bg-background pt-4 pb-20">
            {children}
          </main>
          <Footer />
        </SearchProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
