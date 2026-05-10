  import fs from "fs";
  import path from "path";

  const POSTS_DIR = path.join(process.cwd(), "content", "posts");
  export const ALL_CATEGORY = "All";
  export const POSTS_PER_PAGE = 5;

  type PostFrontmatter = {
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

  type LoadedPostModule = {
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

  const extractPostExcerpt = (source: string): string => {
    const body = source.replace(
      /export\s+const\s+metadata\s*=\s*{[\s\S]*?};/,
      ""
    );

    return body
      .replace(/```[\s\S]*?```/g, "")
      .replace(/^#+\s.*$/gm, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_>`-]/g, "")
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
  };

  const loadPostModule = async (slug: string): Promise<LoadedPostModule | null> => {
    try {
      const postModule = await import(`../content/posts/${slug}.mdx`);

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

  const buildPost = (
    slug: string,
    metadata: PostFrontmatter,
    source?: string
  ): Post => ({
    title: metadata.title,
    description: metadata.description?.trim() || (source ? extractPostExcerpt(source) : ""),
    date: metadata.date,
    category: metadata.category,
    tags: metadata.tags ?? [],
    published: metadata.published ?? true,
    slug,
  });

  const isPublishedPost = (post: Post | null): post is Post =>
    post !== null && post.published;

  const sortPostsByDateDesc = (left: Post, right: Post) =>
    new Date(right.date).getTime() - new Date(left.date).getTime();

  export const parsePageParam = (page: string | undefined): number => {
    const parsedPage = Number(page);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return 1;
    }

    return parsedPage;
  };

  export const slugifyCategory = (category: string): string =>
    category
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

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
      })
    );

    return posts.filter(isPublishedPost).sort(sortPostsByDateDesc);
  };

  export const getPostSlugs = async (): Promise<string[]> => {
    const posts = await getAllPosts();
    return posts.map((post) => post.slug);
  };

  export const getCategorySummaries = async (): Promise<CategorySummary[]> => {
    const posts = await getAllPosts();
    const countByCategory = new Map<string, number>();

    for (const post of posts) {
      countByCategory.set(post.category, (countByCategory.get(post.category) ?? 0) + 1);
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

  export const getCategoryNameBySlug = async (slug: string): Promise<string | null> => {
    const categorySummaries = await getCategorySummaries();
    const matchedCategory = categorySummaries.find((category) => category.slug === slug);

    return matchedCategory?.name ?? null;
  };

  export const getPostsByCategory = async (category: string): Promise<Post[]> => {
    const posts = await getAllPosts();

    if (category === ALL_CATEGORY) {
      return posts;
    }

    const normalizedCategory = category.toLowerCase();

    return posts.filter((post) => post.category.toLowerCase() === normalizedCategory);
  };

  export const paginatePosts = (
    posts: Post[],
    page: number,
    perPage: number
  ): PaginatedPosts => {
    const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
    const startIndex = (page - 1) * perPage;

    return {
      posts: posts.slice(startIndex, startIndex + perPage),
      totalPages,
    };
  };

  export const getPostBySlug = async (slug: string): Promise<PostDetail | null> => {
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
