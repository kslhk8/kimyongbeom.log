import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
	title: "kimyongbeom.log",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-primary text-secondary antialiased">
				<div className="flex min-h-screen flex-col">
					<Header />
					<div className="mx-auto w-full max-w-[1280px] flex-1 px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
