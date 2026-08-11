import Link from "next/link";

type CardProps = {
	title: string;
	description: string;
	date: string;
	href?: string;
};

export function Card({ title, description, date, href }: CardProps) {
	return (
		<article className="px-1 py-1 transition duration-150 hover:-translate-y-px">
			{href ? (
				<Link
					href={href}
					className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
				>
					<div className="space-y-2 px-4 py-4">
						<p className="text-[13px] text-subtle">{date}</p>
						<h2 className="text-[18px] font-semibold tracking-tight text-primary">
							{title}
						</h2>
						<p className="max-w-3xl text-[15px] leading-6 text-muted line-clamp-2">
							{description}
						</p>
					</div>
				</Link>
			) : (
				<div className="space-y-2 px-4 py-4">
					<p className="text-[13px] text-subtle">{date}</p>
					<h2 className="text-[18px] font-semibold tracking-tight text-primary">
						{title}
					</h2>
					<p className="max-w-3xl text-[15px] leading-6 text-muted line-clamp-2">
						{description}
					</p>
				</div>
			)}
		</article>
	);
}
