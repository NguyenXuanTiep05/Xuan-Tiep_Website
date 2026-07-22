import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import FinanceView from "@/view/FinanceView";
import { Metadata } from "next";

export const metadata : Metadata ={
  title: "XT - Finances",
  description:"Finance overview for Xuan Tiep website"
}

export default async function FinancePage() {
  // const token = (await cookies()).get("token")?.value;

  // const res = await fetch("https://xuan-tiep.com/api/auth/verify", {
  //   headers: { cookie: `token=${token}` },
  //   cache: "no-store",
  // });

  // if (res.status === 401) redirect("/login"); 

  return <FinanceView/>; 
}