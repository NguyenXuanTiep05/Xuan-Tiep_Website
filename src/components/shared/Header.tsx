"use client";
import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

const Header = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    return (
        <nav className="absolute top-0 w-full h-15 border-b border-(--border) flex items-center px-14 z-50">
            <Link
                href="/"
                className="absolute translate-x-16 text-3xl font-bold hover:-translate-y-0.5 transition-transform duration-100 text-(--text) "
            >
                <h1>Xuan Tiep</h1>
            </Link>
            <span>{error}</span>
            <div className="ml-auto flex flex-row justify-center items-center gap-8">
                <Link
                    href="/finance"
                    className="flex items-center font-bold text-(--text-lighter)  text-xl hover:-translate-y-0.5 hover:text-(--text) transition-all duration-150"
                >
                    Finances
                </Link>
                <Link
                    href="/notes"
                    className="flex items-center font-bold text-(--text-lighter)  text-xl hover:-translate-y-0.5 hover:text-(--text) transition-all duration-150"
                >
                    Notes
                </Link>
            </div>
            <button
                onClick={() => LogOut()}
                className="ml-auto text-(--text-muted) cursor-pointer hover:text-(--text) hover:font-bold transition-all duration-150"
            >
                Log out
            </button>
        </nav>
    );
};

export default Header;
