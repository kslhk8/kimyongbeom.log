import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function cn(...classes: Array<string | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
			<h1
				className={cn(
					"mt-2 scroll-m-20 text-4xl font-semibold tracking-tight text-primary sm:text-[2.5rem]",
					className,
				)}
				{...props}
			/>
		),
		h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
			<h2
				className={cn(
					"mt-14 scroll-m-20 border-b border-[#f1e6c8] pb-3 text-3xl font-semibold tracking-tight text-primary first:mt-0",
					className,
				)}
				{...props}
			/>
		),
		h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
			<h3
				className={cn(
					"mt-10 scroll-m-20 border-b border-[#f1e6c8] pb-3 text-2xl font-semibold tracking-tight text-primary first-of-type:mt-0",
					className,
				)}
				{...props}
			/>
		),
		h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
			<h4
				className={cn(
					"mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-primary",
					className,
				)}
				{...props}
			/>
		),
		p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
			<p
				className={cn("my-4 text-[1rem] leading-[1.5] text-primary", className)}
				{...props}
			/>
		),
		ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
			<ul
				className={cn(
					"my-3 list-['■'] space-y-2 pl-4 text-[1rem] leading-[1.5] text-primary marker:text-[1em] marker:text-primary [&_ul]:list-['-']",
					className,
				)}
				{...props}
			/>
		),
		ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
			<ol
				className={cn(
					"my-3 list-decimal space-y-2 pl-4 text-[1rem] leading-[1.5] text-primary marker:text-[#b38b2d]",
					className,
				)}
				{...props}
			/>
		),
		li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
			<li className={cn("pl-2", className)} {...props} />
		),
		a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
			<a
				className={cn(
					"font-medium text-primary underline decoration-[#e7d7aa] underline-offset-4 transition-colors hover:text-secondary",
					className,
				)}
				{...props}
			/>
		),
		strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
			<strong
				className={cn("font-semibold text-primary", className)}
				{...props}
			/>
		),
		blockquote: ({
			className,
			...props
		}: ComponentPropsWithoutRef<"blockquote">) => (
			<blockquote
				className={cn(
					"my-8 rounded-r-2xl border-l-4 border-[#e7d7aa] bg-[#fff8e7] px-5 py-4 text-[1.02rem] leading-[1.5] text-[#57534e]",
					className,
				)}
				{...props}
			/>
		),
		hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
			<hr className={cn("my-10 border-[#f1e6c8]", className)} {...props} />
		),
		table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
			<div className="my-8 overflow-x-auto rounded-2xl border border-default bg-[#fffdf6]">
				<table
					className={cn("min-w-full border-collapse text-left", className)}
					{...props}
				/>
			</div>
		),
		th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
			<th
				className={cn(
					"border-b border-default bg-[#fff8e7] px-4 py-3 text-sm font-semibold text-primary",
					className,
				)}
				{...props}
			/>
		),
		td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
			<td
				className={cn(
					"border-b border-[#f5ecd4] px-4 py-3 text-sm leading-7 text-primary",
					className,
				)}
				{...props}
			/>
		),
		pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
			<pre
				className={cn(
					"my-6 overflow-x-auto rounded-2xl border border-[#FBEECC] bg-white px-5 py-4 [&_*]:!border-0 [&_*]:!bg-transparent",
					className,
				)}
				{...props}
			/>
		),
		code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
			if (className?.startsWith("language-")) {
				return (
					<code
						className={cn(
							"font-mono text-[0.95rem] leading-7 text-[#343538]",
							className,
						)}
						{...props}
					/>
				);
			}

			return (
				<code
					className={cn(
						"rounded-md bg-active px-1.5 py-0.5 font-mono text-[0.9em] text-primary",
						className,
					)}
					{...props}
				/>
			);
		},
		...components,
	};
}
