import NotesView from "@/view/NotesView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "XT - Notes",
    description: "Notes application - Xuan Tiep",
};

export default async function FinancePage() {
    return <NotesView />;
}
