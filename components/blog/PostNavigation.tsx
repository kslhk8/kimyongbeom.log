import Link from "next/link";
import type { Post } from "@/lib/posts";

type PostNavigationProps = {
	prev: Post | null;
	next: Post | null;
};

export function PostNavigation({ prev, next }: PostNavigationProps) {
	return (
		<nav className="mt-12 flex items-center justify-between gap-4 border-t border-default pt-8">
			<div className="flex-1">
				{prev && (
					<Link
						href={`/blog/${prev.slug}`}
						className="group flex items-center gap-2 text-sm transition-colors hover:text-primary"
					>
						<svg
							className="h-4 w-4 transition-transform group-hover:-translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<div className="flex flex-col">
							<span className="text-xs text-muted">이전 글</span>
							<span className="font-medium">{prev.title}</span>
						</div>
					</Link>
				)}
			</div>
			<div className="flex-1 text-right">
				{next && (
					<Link
						href={`/blog/${next.slug}`}
						className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
					>
						<div className="flex flex-col">
							<span className="text-xs text-muted">다음 글</span>
							<span className="font-medium">{next.title}</span>
						</div>
						<svg
							className="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
				)}
			</div>
		</nav>
	);
}
