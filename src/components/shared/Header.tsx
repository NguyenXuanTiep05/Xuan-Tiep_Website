"use client";
import { useState } from "react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import "@/assets/Header.css";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";

const Header = () => {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const pathname = usePathname();
	const isMainPage = pathname !== "/";

	const LogOut = async () => {
		try {
			const response = await fetch(
				"https://xuan-tiep.com/api/auth/logout",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				},
			);

			if (!response.ok) {
				setError("There was problem with logging you out");
				return;
			}
			router.replace("/login");
		} catch {
			setError(`Something went wrong`);
		}
	};
	const tabs = [
		{ label: "Resume", href: "/" },
		{ label: "Finance", href: "/finance" },
		{ label: "Notes", href: "/notes" },
	];

	return (
		<nav className="absolute top-0 w-full h-15 border-b border-(--border) flex items-center px-14 z-50">
			<Link
				href="/dashboard"
				className="absolute translate-x-16 text-3xl font-bold hover:-translate-y-0.5 transition-transform duration-100 text-(--text) "
			>
				<h1>Xuan Tiep</h1>
			</Link>
			<span>{error}</span>
			{isMainPage ? (
				<>
					<div className="ml-auto flex flex-row justify-center items-center gap-8 w-auto select-none">
						{tabs.map((tab) => (
							<Link
								key={tab.href}
								href={tab.href}
								className={
									pathname === tab.href
										? "header_link active"
										: "header_link"
								}
							>
								{tab.label}
							</Link>
						))}
					</div>
					<button
						onClick={() => LogOut()}
						className="ml-auto text-(--text-muted) cursor-pointer hover:text-(--text) hover:font-bold transition-all duration-150"
					>
						Log out
					</button>
				</>
			) : null}
		</nav>
	);
};

export default Header;
