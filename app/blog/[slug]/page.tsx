import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getAdjacentPosts } from "@/lib/posts";
import { PostNavigation } from "@/components/blog/PostNavigation";

type BlogPostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: `${post.title} | kimyongbeom.log`,
		description: post.description,
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const { Content } = post;
	const { prev, next } = await getAdjacentPosts(slug);

	return (
		<div className="mx-auto rounded-2xl border border-default bg-card px-6 py-8 sm:px-10 sm:py-10">
			<article className="max-w-none">
				<Content />
			</article>
			<PostNavigation prev={prev} next={next} />
		</div>
	);
}
