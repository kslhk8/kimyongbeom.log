"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CategorySummary } from "@/lib/posts";

type SidebarNavProps = {
  categories: CategorySummary[];
};

export function SidebarNav({ categories }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <ul className="mt-3 space-y-0.5">
      {categories.map((category) => {
        const href =
          category.name === "All"
            ? "/blog"
            : `/blog/category/${category.slug}`;
        const isActive =
          category.name === "All"
            ? pathname === "/" || pathname === "/blog"
            : pathname === href;

        return (
          <li key={category.slug}>
            <Link
              href={href}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[14px] transition ${
                isActive
                  ? "bg-active font-semibold text-primary"
                  : "text-secondary hover:bg-hover/60 hover:text-secondary"
              }`}
            >
              <span>{category.name}</span>
              <span
                className={`text-[13px] ${
                  isActive ? "text-primary/80" : "text-subtle"
                }`}
              >
                {category.count}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
