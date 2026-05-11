import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/PostList";
import {
  ALL_CATEGORY,
  POSTS_PER_PAGE,
  getCategorySummaries,
  getCategoryNameBySlug,
  getPostsByCategory,
  paginatePosts,
  parsePageParam,
  slugifyCategory,
} from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateStaticParams() {
  const categorySummaries = await getCategorySummaries();

  return categorySummaries
    .filter(({ name }) => name !== ALL_CATEGORY)
    .map(({ name }) => ({
      category: slugifyCategory(name),
    }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = await getCategoryNameBySlug(category);

  if (!categoryName || categoryName === ALL_CATEGORY) {
    return {
      title: "Category Not Found | kimyongbeom.log",
    };
  }

  return {
    title: `${categoryName} | kimyongbeom.log`,
    description: `${categoryName} 카테고리 글 목록입니다.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ category }, { page }] = await Promise.all([params, searchParams]);
  const categoryName = await getCategoryNameBySlug(category);

  if (!categoryName || categoryName === ALL_CATEGORY) {
    notFound();
  }

  const currentPage = parsePageParam(page);
  const posts = await getPostsByCategory(categoryName);
  const paginatedPosts = paginatePosts(posts, currentPage, POSTS_PER_PAGE);

  if (currentPage > paginatedPosts.totalPages) {
    notFound();
  }

  return (
    <PostList
      posts={paginatedPosts.posts}
      currentPage={currentPage}
      totalPages={paginatedPosts.totalPages}
      pathname={`/blog/category/${category}`}
    />
  );
}
