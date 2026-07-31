"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";
import Header from "../components/shared/Header";
import FinanceList from "@/components/finance/FinanceList";
import FinanceValueForm from "@/components/finance/FinanceValueForm";
import IncomeExpense from "@/components/finance/IncomeExpense";
import Balance from "@/components/finance/Balance";
import FinanceOverviewDto from "@/models/finance/FinanceOverviewDto";
import FinanceChangeDto from "@/models/finance/FinanceChangeDto";
import "@/assets/FinanceOverview.css";
import axios from "axios";

const FinanceView = () => {
    const [data, setData] = useState<FinanceOverviewDto>();
    const [err, setErr] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        apiClient
            .get("/finance/overview", {})
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                if (axios.isCancel(error)) return;
                setErr(error.message);
            });
        return () => controller.abort();
    }, []);

    const addRecord = (record: FinanceChangeDto) => {
        setData((prev) => {
            if (!prev) return prev;

            if (record.type === "income") {
                return {
                    ...prev,
                    income: [record, ...prev.income],
                    summary: {
                        ...prev.summary,
                        totalIncome: prev.summary.totalIncome + record.value,
                    },
                };
            } else {
                return {
                    ...prev,
                    expenses: [record, ...prev.expenses],
                    summary: {
                        ...prev.summary,
                        totalExpenses:
                            prev.summary.totalExpenses + record.value,
                    },
                };
            }
        });
    };

    const removeRecord = (id: number, type: string) => {
        setData((prev) => {
            if (!prev) return prev;

            if (type === "income") {
                const removed = prev.income.find((r) => r.recordId === id);
                return {
                    ...prev,
                    income: prev.income.filter((r) => r.recordId !== id),
                    summary: {
                        ...prev.summary,
                        totalIncome:
                            prev.summary.totalIncome - (removed?.value ?? 0),
                    },
                };
            } else {
                const removed = prev.expenses.find((r) => r.recordId === id);
                return {
                    ...prev,
                    expenses: prev.expenses.filter((r) => r.recordId !== id),
                    summary: {
                        ...prev.summary,
                        totalExpenses:
                            prev.summary.totalExpenses - (removed?.value ?? 0),
                    },
                };
            }
        });
    };

    return (
        <section className="w-full h-full pt-15 text-(--text)">
            <Header />
            <div className="slide-in content-wrapper flex gap-8">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="w-full h-[27%] flex flex-col">
                        <Balance
                            amount={
                                (data?.summary.totalIncome ?? 0) +
                                (data?.summary.totalExpenses ?? 0)
                            }
                        />
                        <div className="flex flex-row gap-4 mt-auto justify-center">
                            <IncomeExpense
                                title="Income"
                                amount={data?.summary.totalIncome ?? 0}
                            />
                            <IncomeExpense
                                title="Expenses"
                                amount={data?.summary.totalExpenses ?? 0}
                                left={true}
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 min-h-0">
                        <h1 className="text-3xl m-auto">WIP: Pie chart here</h1>
                    </div>
                </div>
                <div className="w-[70%] h-full flex flex-col min-w-0">
                    <div className="w-full h-fit self-start flex flex-row items-center">
                        <FinanceValueForm onAdd={addRecord} />
                    </div>
                    <div className="flex-1 mt-4 min-h-0">
                        <FinanceList
                            History={
                                data
                                    ? [...data.income, ...data.expenses].sort(
                                          (a, b) =>
                                              new Date(b.date).getTime() -
                                              new Date(a.date).getTime(),
                                      )
                                    : null
                            }
                            onDelete={removeRecord}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinanceView;
