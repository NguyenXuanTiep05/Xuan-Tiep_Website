import TaskView from "@/view/TasksView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "XT - Tasks",
    description: "Personal task board",
};

export default async function FinancePage() {
    return <TaskView />;
}
