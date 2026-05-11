import { Sidebar } from "@/components/layout/Sidebar";

export default function BlogListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
