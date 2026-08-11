import fs from "node:fs";
import type { Post, PostDetail, CategorySummary } from "./types";
import {
	POSTS_DIR,
	ALL_CATEGORY,
	slugifyCategory,
	loadPostModule,
	buildPost,
	isPublishedPost,
	sortPostsByDateDesc,
} from "./utils";

export const getAllPosts = async (): Promise<Post[]> => {
	const postFileNames = fs
		.readdirSync(POSTS_DIR)
		.filter((fileName) => fileName.endsWith(".mdx"));

	const posts = await Promise.all(
		postFileNames.map(async (fileName) => {
			const slug = fileName.replace(/\.mdx$/, "");
			const postModule = await loadPostModule(slug);

			if (!postModule) {
				return null;
			}

			return buildPost(slug, postModule.metadata, postModule.source);
		}),
	);

	return posts.filter(isPublishedPost).sort(sortPostsByDateDesc);
};

export const getPostSlugs = async (): Promise<string[]> => {
	const posts = await getAllPosts();
	return posts.map((post) => post.slug);
};

export const getPostBySlug = async (
	slug: string,
): Promise<PostDetail | null> => {
	const postModule = await loadPostModule(slug);

	if (!postModule) {
		return null;
	}

	const post = buildPost(slug, postModule.metadata, postModule.source);

	if (!post.published) {
		return null;
	}

	return {
		...post,
		Content: postModule.Content,
	};
};

export const getAdjacentPosts = async (
	currentSlug: string,
): Promise<{ prev: Post | null; next: Post | null }> => {
	const allPosts = await getAllPosts();
	const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	return {
		prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
		next:
			currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
	};
};

export const getCategorySummaries = async (): Promise<CategorySummary[]> => {
	const posts = await getAllPosts();
	const countByCategory = new Map<string, number>();

	for (const post of posts) {
		countByCategory.set(
			post.category,
			(countByCategory.get(post.category) ?? 0) + 1,
		);
	}

	const categorySummaries = Array.from(countByCategory.entries())
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([name, count]) => ({
			name,
			slug: slugifyCategory(name),
			count,
		}));

	return [
		{
			name: ALL_CATEGORY,
			slug: slugifyCategory(ALL_CATEGORY),
			count: posts.length,
		},
		...categorySummaries,
	];
};

export const getCategoryNameBySlug = async (
	slug: string,
): Promise<string | null> => {
	const categorySummaries = await getCategorySummaries();
	const matchedCategory = categorySummaries.find(
		(category) => category.slug === slug,
	);

	return matchedCategory?.name ?? null;
};

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
	const posts = await getAllPosts();

	if (category === ALL_CATEGORY) {
		return posts;
	}

	const normalizedCategory = category.toLowerCase();

	return posts.filter(
		(post) => post.category.toLowerCase() === normalizedCategory,
	);
};

export const searchPosts = async (query: string): Promise<Post[]> => {
	if (!query.trim()) {
		return getAllPosts();
	}

	const normalizedQuery = query.toLowerCase();

	const postFileNames = fs
		.readdirSync(POSTS_DIR)
		.filter((fileName) => fileName.endsWith(".mdx"));

	const posts = await Promise.all(
		postFileNames.map(async (fileName) => {
			const slug = fileName.replace(/\.mdx$/, "");
			const postModule = await loadPostModule(slug);

			if (!postModule) {
				return null;
			}

			const post = buildPost(slug, postModule.metadata, postModule.source);
			const titleMatch = post.title.toLowerCase().includes(normalizedQuery);
			const contentMatch = postModule.source
				.toLowerCase()
				.includes(normalizedQuery);

			if (titleMatch || contentMatch) {
				return post;
			}

			return null;
		}),
	);

	return posts.filter(isPublishedPost).sort(sortPostsByDateDesc);
};
