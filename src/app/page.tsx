import DashboardView from "@/view/DashboardView";
import type { Metadata } from "next";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
    title: "XT - Dashboard",
    description: "Dashboard for Xuan Tiep website",
};

export default async function Page() {
    // const token = (await cookies()).get("token")?.value;

    // const res = await fetch("https://xuan-tiep.com/api/auth/verify", {
    //   headers: { cookie: `token=${token}` },
    //   cache: "no-store",
    // });

    // if (res.status === 401) redirect("/login");

    return (
        <section className="w-full h-full pt-15 text-(--text)">
            <Header />
            <DashboardView />
        </section>
    );
}
