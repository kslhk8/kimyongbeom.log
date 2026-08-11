import type { Metadata } from "next";
import { PostList } from "@/components/blog/PostList";
import {
	POSTS_PER_PAGE,
	searchPosts,
	paginatePosts,
	parsePageParam,
} from "@/lib/posts";

export const metadata: Metadata = {
	title: "검색 | kimyongbeom.log",
	description: "블로그 글 검색 결과입니다.",
};

type SearchPageProps = {
	searchParams: Promise<{
		q?: string;
		page?: string;
	}>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { q, page } = await searchParams;
	const query = q || "";
	const currentPage = parsePageParam(page);
	const posts = await searchPosts(query);
	const paginatedPosts = paginatePosts(posts, currentPage, POSTS_PER_PAGE);

	return (
		<div className="space-y-6">
			{query && (
				<div className="text-sm text-muted-foreground">
					<span className="font-semibold text-foreground">&quot;{query}&quot;</span>에 대한 검색 결과{" "}
					<span className="font-semibold text-foreground">{posts.length}</span>개
				</div>
			)}
			<PostList
				posts={paginatedPosts.posts}
				currentPage={currentPage}
				totalPages={paginatedPosts.totalPages}
				pathname="/blog/search"
				queryParams={query ? { q: query } : undefined}
			/>
		</div>
	);
}
