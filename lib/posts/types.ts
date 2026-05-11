export type PostFrontmatter = {
	title: string;
	description?: string;
	date: string;
	category: string;
	tags?: string[];
	published?: boolean;
};

export type Post = {
	title: string;
	description: string;
	date: string;
	category: string;
	tags: string[];
	published: boolean;
	slug: string;
};

export type PostDetail = Post & {
	Content: React.ComponentType;
};

export type LoadedPostModule = {
	metadata: PostFrontmatter;
	Content: React.ComponentType;
	source: string;
};

export type CategorySummary = {
	name: string;
	slug: string;
	count: number;
};

export type PaginatedPosts = {
	posts: Post[];
	totalPages: number;
};
