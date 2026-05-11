import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/PostList";
import {
	POSTS_PER_PAGE,
	getAllPosts,
	paginatePosts,
	parsePageParam,
} from "@/lib/posts";

export const metadata: Metadata = {
	title: "Blog | kimyongbeom.log",
	description: "전체 블로그 글 목록입니다.",
};

type BlogPageProps = {
	searchParams: Promise<{
		page?: string;
	}>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const { page } = await searchParams;
	const currentPage = parsePageParam(page);
	const posts = await getAllPosts();
	const paginatedPosts = paginatePosts(posts, currentPage, POSTS_PER_PAGE);

	if (currentPage > paginatedPosts.totalPages) {
		notFound();
	}

	return (
		<PostList
			posts={paginatedPosts.posts}
			currentPage={currentPage}
			totalPages={paginatedPosts.totalPages}
			pathname="/blog"
		/>
	);
}
