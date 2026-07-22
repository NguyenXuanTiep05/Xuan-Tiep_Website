import LoginView from "@/view/LoginView";
import { Metadata } from "next";

export const metadata : Metadata ={
  title: "Xuan Tiep - Login",
  description:"Login page for Xuan Tiep website"
}

export default  function Page(){
  return <LoginView/>
}