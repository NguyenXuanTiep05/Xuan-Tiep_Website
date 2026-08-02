import NotesView from "@/view/NotesView";
import Header from "@/components/shared/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "XT - Notes",
    description: "Notes application - Xuan Tiep",
};

export default async function FinancePage() {
    return (
        <section className="w-full h-full pt-15 text-(--text)">
            <Header />
            <NotesView />
        </section>
    );
}
