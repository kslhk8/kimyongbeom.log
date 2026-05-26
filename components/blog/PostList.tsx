import { Card } from "@/components/common/Card";
import type { Post } from "@/lib/posts";
import { Pagination } from "./Pagination";

type PostListProps = {
	posts: Post[];
	currentPage: number;
	totalPages: number;
	pathname: string;
	queryParams?: Record<string, string>;
};

export function PostList({
	posts,
	currentPage,
	totalPages,
	pathname,
	queryParams,
}: PostListProps) {
	return (
		<section className="space-y-6">
			{posts.length > 0 ? (
				<div className="overflow-hidden rounded-2xl border border-default bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
					<div className="divide-y divide-default">
						{posts.map((post) => (
							<Card
								key={post.slug}
								title={post.title}
								description={post.description}
								date={post.date}
								href={`/blog/${post.slug}`}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="rounded-2xl border border-default bg-card px-6 py-10 text-sm text-muted">
					No posts found.
				</div>
			)}

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				pathname={pathname}
				queryParams={queryParams}
			/>
		</section>
	);
}
