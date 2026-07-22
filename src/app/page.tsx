import DashboardView from "@/view/DashboardView";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function Page(){

  // const token = (await cookies()).get("token")?.value;

  // const res = await fetch("https://xuan-tiep.com/api/auth/verify", {
  //   headers: { cookie: `token=${token}` },
  //   cache: "no-store",
  // });

  // if (res.status === 401) redirect("/login"); 

  return <DashboardView/>
}