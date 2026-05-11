import fs from "node:fs";
import path from "node:path";
import type {
	Post,
	PostFrontmatter,
	LoadedPostModule,
	PaginatedPosts,
} from "./types";

export const POSTS_DIR = path.join(process.cwd(), "content", "posts");
export const ALL_CATEGORY = "All";
export const POSTS_PER_PAGE = 5;

export const slugifyCategory = (category: string): string =>
	category
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

export const parsePageParam = (page: string | undefined): number => {
	const parsedPage = Number(page);

	if (!Number.isInteger(parsedPage) || parsedPage < 1) {
		return 1;
	}

	return parsedPage;
};

export const paginatePosts = (
	posts: Post[],
	page: number,
	perPage: number,
): PaginatedPosts => {
	const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
	const startIndex = (page - 1) * perPage;

	return {
		posts: posts.slice(startIndex, startIndex + perPage),
		totalPages,
	};
};

const extractPostExcerpt = (source: string): string => {
	const body = source.replace(
		/export\s+const\s+metadata\s*=\s*{[\s\S]*?};/,
		"",
	);

	return body
		.replace(/```[\s\S]*?```/g, "")
		.replace(/^#+\s.*$/gm, "")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/^\s*[-*+]\s+/gm, "")
		.replace(/[*_>`]/g, "")
		.replace(/\n+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 160);
};

export const loadPostModule = async (
	slug: string,
): Promise<LoadedPostModule | null> => {
	try {
		const postModule = await import(`../../content/posts/${slug}.mdx`);

		const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
		const source = fs.readFileSync(filePath, "utf-8");

		return {
			metadata: postModule.metadata,
			Content: postModule.default,
			source,
		};
	} catch {
		return null;
	}
};

export const buildPost = (
	slug: string,
	metadata: PostFrontmatter,
	source?: string,
): Post => ({
	title: metadata.title,
	description:
		metadata.description?.trim() || (source ? extractPostExcerpt(source) : ""),
	date: metadata.date,
	category: metadata.category,
	tags: metadata.tags ?? [],
	published: metadata.published ?? true,
	slug,
});

export const isPublishedPost = (post: Post | null): post is Post =>
	post !== null && post.published;

export const sortPostsByDateDesc = (left: Post, right: Post) =>
	new Date(right.date).getTime() - new Date(left.date).getTime();
