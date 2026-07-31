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

                            <th className="px-8 py-4 font-medium text-(--text-lighter)">
                                Value
                            </th>
                            <th className="px-8 py-4 text-left font-medium text-(--text-lighter)">
                                Description
                            </th>
                            <th className="px-8 py-4 text-right font-medium text-(--text-lighter)">
                                Options
                            </th>
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
                                    className="border-t  border-(--text-muted) hover:bg-(--bg)"
                                >
                                    <td className="w-12 px-4 py-4">
                                        <div className="flex items-center justify-center">
                                            {val.value > 0 ? (
                                                <ArrowRight />
                                            ) : (
                                                <ArrowLeft />
                                            )}
                                        </div>
                                    </td>
                                    <td
                                        className={`w-1/6 text-center px-8 py-4 ${val.value > 0 ? "text-(--success)" : "text-(--warning)"}`}
                                    >
                                        {val.value} {val.currency}
                                    </td>
                                    <td className="w-1/6 px-8 py-4 text-(--text-muted)">
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
                                    <td className="w-auto px-8 py-4 text-(--text)">
                                        {val.description}
                                    </td>
                                    <td className="w-auto p-4 text-right">
                                        <button
                                            onClick={() =>
                                                DeleteRecord(
                                                    val.recordId,
                                                    val.type,
                                                )
                                            }
                                            className="warning-btn"
                                        >
                                            Delete
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
