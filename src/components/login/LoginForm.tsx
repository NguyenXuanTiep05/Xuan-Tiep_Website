"use client";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/client";

import { useEffect, useState } from "react";

const SidePanelAnimation = () => {
    const animations = document.querySelectorAll(".animate");
    if (animations.length > 0) {
        animations.forEach((element) => {
            element.classList.add("slide");
        });
    }
};

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [callbackUrl, setCallbackUrl] = useState(() => {
        if (typeof document === "undefined") return "/"; // SSR guard
        const match = document.cookie.match(/callbackUrl=([^;]+)/);
        return match ? decodeURIComponent(match[1]) : "/dashboard";
    });
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            setError("Verifying...");
            await apiClient.post("/auth/login", { username, password });

            SidePanelAnimation();
            setTimeout(() => {
                router.push(callbackUrl);
            }, 900);
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <article
            id="login-form"
            className="animate z-10 absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-120 h-fit bg-(--bg) rounded-2xl shadow-sm shadow-(color:--border) p-6 text-(--text) border-1  border-(--border)"
        >
            <form onSubmit={handleLogin}>
                <h1 className="text-4xl font-bold ">Welcome Back</h1>
                <h1 className="text-sm text-(--text-muted) mt-1 mb-7  font-semibold">
                    Sign in to continue
                </h1>
                <label className=" text-md text-(--text-lighter)">
                    Username:
                </label>
                <br />
                <input
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    autoComplete="off"
                    className="mt-2 h-10 w-full input-primary"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="text-md text-(--text-lighter)">
                    Password:
                </label>
                <br />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="off"
                    className="mt-2 h-10 w-full input-primary"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className=" flex w-100%">
                    <div className="text-(--warning) ml-2 mt-6 flex items-center">
                        {error}
                    </div>
                    <button
                        type="submit"
                        id="login-btn"
                        className="primary-btn ml-auto mt-6"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </article>
    );
};

export default LoginForm;
