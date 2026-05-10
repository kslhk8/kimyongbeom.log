import { getCategorySummaries } from "@/lib/posts";
import { SidebarNav } from "./SidebarNav";

export async function Sidebar() {
  const categories = await getCategorySummaries();

  return (
    <aside className="w-full lg:w-[220px] lg:shrink-0 lg:self-start">
      <div className="lg:border-r border-default lg:pr-7">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-primary">
            Categories
          </p>
          <SidebarNav categories={categories} />
        </div>
      </div>
    </aside>
  );
}
