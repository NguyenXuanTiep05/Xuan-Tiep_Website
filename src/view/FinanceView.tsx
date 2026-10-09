"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";
import FinanceList from "@/components/finance/FinanceList";
import FinanceValueForm from "@/components/finance/FinanceValueForm";
import IncomeExpense from "@/components/finance/IncomeExpense";
import Balance from "@/components/finance/Balance";
import FinanceOverviewDto from "@/models/finance/FinanceOverviewDto";
import FinanceChangeDto from "@/models/finance/FinanceChangeDto";
import "@/assets/FinanceOverview.css";
import axios from "axios";

//test
// const incomeNames = [
//     "Salary",
//     "Freelance project",
//     "Bonus",
//     "Sold old phone",
//     "Interest",
//     "Gift",
// ];
// const expenseNames = [
//     "Rent",
//     "Groceries",
//     "Internet",
//     "Electricity",
//     "Fuel",
//     "Restaurant",
//     "Netflix",
//     "Gym",
//     "Pharmacy",
//     "Clothes",
//     "Phone bill",
//     "Coffee",
// ];

// function createMockOverview(count = 60): FinanceOverviewDto {
//     const income: FinanceChangeDto[] = [];
//     const expenses: FinanceChangeDto[] = [];

//     for (let i = 1; i <= count; i++) {
//         const isIncome = i % 4 === 0; // every 4th record is income
//         const names = isIncome ? incomeNames : expenseNames;
//         const month = String((i % 12) + 1).padStart(2, "0");
//         const day = String((i % 28) + 1).padStart(2, "0");

//         const item: FinanceChangeDto = {
//             recordId: i,
//             value: isIncome
//                 ? 5000 + ((i * 7919) % 4000000000)
//                 : (80 + ((i * 3571) % 1200000000)) * -1,
//             currency: "CZK",
//             description: names[i % names.length],
//             date: `2026-${month}-${day}`,
//             type: isIncome ? "income" : "expense",
//         };

//         (isIncome ? income : expenses).push(item);
//     }

//     return {
//         income,
//         expenses,
//         summary: {
//             totalIncome: income.reduce((sum, x) => sum + x.value, 0),
//             totalExpenses: expenses.reduce((sum, x) => sum + x.value, 0),
//             currency: "CZK",
//         },
//     };
// }

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
                // setData(() => createMockOverview());
                if (axios.isCancel(error)) return;
                setErr(error.message);
            });
        return () => controller.abort();
    }, []);

    const addRecord = (record: FinanceChangeDto) => {
        setData((prev) => {
            if (!prev) return prev;

            if (record.type === "income") {
                const next = {
                    ...prev,
                    income: [record, ...prev.income],
                    summary: {
                        ...prev.summary,
                        totalIncome: prev.summary.totalIncome + record.value,
                    },
                };
                return next;
            } else {
                const next = {
                    ...prev,
                    expenses: [record, ...prev.expenses],
                    summary: {
                        ...prev.summary,
                        totalExpenses:
                            prev.summary.totalExpenses + record.value,
                    },
                };
                return next;
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
        <div className="slide-in content-wrapper flex gap-8 max-tablet:flex-col max-tablet:overflow-scroll">
            <div className="flex-1 max-w-[30%] flex flex-col gap-4 max-tablet:max-w-full max-tablet:flex-none">
                <div className="w-full min-h-[27%] gap-2 flex flex-col">
                    <Balance
                        amount={
                            (data?.summary.totalIncome ?? 0) +
                            (data?.summary.totalExpenses ?? 0)
                        }
                    />
                    <div className="flex flex-row gap-2 mt-auto justify-center max-laptop:flex-col max-tablet:flex-row">
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
                <div className="flex flex-10 border-dashed card max-tablet:h-80 max-tablet:flex-none">
                    <h1 className="text-3xl m-auto">WIP: Pie chart here</h1>
                </div>
            </div>
            <div className="w-[70%] h-full flex flex-col min-w-0 max-tablet:w-full">
                <div className="w-full h-fit self-start flex flex-row items-center">
                    <FinanceValueForm onAdd={addRecord} />
                </div>
                <div className="flex-1 mt-4 min-h-0">
                    <FinanceList
                        History={
                            data
                                ? [
                                      ...(data.income ?? []),
                                      ...(data.expenses ?? []),
                                  ].sort(
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
    );
};

export default FinanceView;
