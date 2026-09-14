"use client";
import { apiClient } from "@/api/client";
import FinanceChangeDto from "@/models/finance/FinanceChangeDto";

const ArrowLeft = ({ size = 30, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
    </svg>
);

const ArrowRight = ({ size = 30, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
    </svg>
);
const financeChanges: FinanceChangeDto[] = [
    {
        recordId: 1,
        value: 2500,
        currency: "USD",
        description: "Monthly salary",
        date: "2026-09-01",
        type: "income",
    },
    {
        recordId: 2,
        value: 950,
        currency: "USD",
        description: "Rent",
        date: "2026-09-02",
        type: "expense",
    },
    {
        recordId: 3,
        value: 78.4,
        currency: "USD",
        description: "Groceries",
        date: "2026-09-03",
        type: "expense",
    },
    {
        recordId: 4,
        value: 12.99,
        currency: "USD",
        description: "Streaming subscription",
        date: "2026-09-04",
        type: "expense",
    },
    {
        recordId: 5,
        value: 400,
        currency: "USD",
        description: "Freelance project",
        date: "2026-09-05",
        type: "income",
    },
    {
        recordId: 6,
        value: 45,
        currency: "EUR",
        description: "Train ticket",
        date: "2026-09-06",
        type: "expense",
    },
    {
        recordId: 7,
        value: 130.5,
        currency: "USD",
        description: "Electricity bill",
        date: "2026-09-08",
        type: "expense",
    },
    {
        recordId: 8,
        value: 60,
        currency: "USD",
        description: "Dinner with friends",
        date: "2026-09-10",
        type: "expense",
    },
    {
        recordId: 9,
        value: 150,
        currency: "USD",
        description: "Dividends",
        date: "2026-09-11",
        type: "income",
    },
    {
        recordId: 10,
        value: 89.99,
        currency: "USD",
        description: "New headphones",
        date: "2026-09-12",
        type: "expense",
    },
];

const FinanceList = ({
    History,
    onDelete,
}: {
    History: FinanceChangeDto[] | null;
    onDelete: (id: number, type: string) => void;
}) => {
    const DeleteRecord = async (id: number, type: string) => {
        try {
            await apiClient.post("finance/del_finance_rec", { id, type });

            onDelete(id, type);
        } catch {
            return "There was a problem with deleting the record.";
        }
    };

    return (
        <>
            <article className="h-full w-full card p-0! overflow-y-scroll overflow-x-hidden no-scrollbar">
                <table className="w-full table-auto border-collapse">
                    <thead className="sticky top-0 bg-(--bg)">
                        <tr className="border-b border-(--highlight)">
                            <th className="w-fit"></th>
                            <th className="px-8 py-4 font-medium text-(--text-lighter)">
                                Datum
                            </th>
                            <th className="px-8 text-left font-medium text-(--text-lighter)">
                                Description
                            </th>
                            <th className="px-8 font-medium text-(--text-lighter)">
                                Value
                            </th>
                            <th className="px-8 text-right font-medium text-(--text-lighter)"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {History == null || History.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 text-center text-(--text-muted)"
                                >
                                    There is no data to show.
                                </td>
                            </tr>
                        ) : (
                            History.map((val, i) => (
                                <tr
                                    key={i}
                                    className="border-t  border-(--border) hover:bg-(--bg-light)"
                                >
                                    <td className="w-12 px-4">
                                        <div className="flex items-center justify-center">
                                            {val.value > 0 ? (
                                                <ArrowRight />
                                            ) : (
                                                <ArrowLeft />
                                            )}
                                        </div>
                                    </td>
                                    <td className="w-1/6 px-8 text-(--text-muted)">
                                        {new Date(val.date).toLocaleString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            },
                                        )}
                                    </td>
                                    <td className="w-auto px-8 text-(--text)">
                                        {val.description}
                                    </td>
                                    <td
                                        className={`w-1/6 text-center px-8 ${val.value > 0 ? "text-(--success-text)" : "text-(--warning-text)"}`}
                                    >
                                        {val.value} {val.currency}
                                    </td>
                                    <td className="w-auto p-4 text-right">
                                        <button
                                            onClick={() =>
                                                DeleteRecord(
                                                    val.recordId,
                                                    val.type,
                                                )
                                            }
                                            className=" btn btn-sm hover:bg-(--bg-hover)"
                                        >
                                            &#x2715;
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </article>
        </>
    );
};

export default FinanceList;
