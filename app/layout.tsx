import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "kimyongbeom.log",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFF8E7] text-zinc-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-8 px-5 py-8 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:py-10">
            <Sidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
