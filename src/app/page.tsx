import DashboardView from "@/view/DashboardView";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from 'next';

export const metadata : Metadata ={
  title: "XT - Dashboard",
  description:"Dashboard for Xuan Tiep website"
}


export default async function Page(){

  // const token = (await cookies()).get("token")?.value;

  // const res = await fetch("https://xuan-tiep.com/api/auth/verify", {
  //   headers: { cookie: `token=${token}` },
  //   cache: "no-store",
  // });

  // if (res.status === 401) redirect("/login"); 

  return <DashboardView/>
}