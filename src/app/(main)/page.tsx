import ResumeView from "@/view/ResumeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nguyen Xuan Tiep - CV",
  description: "CV for Nguyen Xuan Tiep for programming positions.",
  icons: {
    icon: [
      {
        url: "/nt-icon-light.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/nt-icon-dark.svg",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export default async function Page() {
  // const token = (await cookies()).get("token")?.value;

  // const res = await fetch("https://xuan-tiep.com/api/auth/verify", {
  //   headers: { cookie: `token=${token}` },
  //   cache: "no-store",
  // });

  // if (res.status === 401) redirect("/login");

  return <ResumeView />;
}
