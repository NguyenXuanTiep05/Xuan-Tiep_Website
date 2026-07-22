import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import FinanceView from "@/view/FinanceView";

export default async function FinancePage() {
  // const token = (await cookies()).get("token")?.value;

  // const res = await fetch("https://xuan-tiep.com/api/auth/verify", {
  //   headers: { cookie: `token=${token}` },
  //   cache: "no-store",
  // });

  // if (res.status === 401) redirect("/login"); 

  return <FinanceView/>; 
}