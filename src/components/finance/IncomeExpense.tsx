"use client";
import React from "react";

const IncomeExpense = ({
    title,
    amount,
    left = false,
}: {
    title: string;
    amount: number;
    left?: boolean;
}) => {
    return (
        <article className={`w-[40%] card ${left ? "ml-auto" : ""}`}>
            <h2 className="h4 text-(--text-lighter)">{title}</h2>
            <p
                className={`h3 ${amount > 0 ? "text-(--success)" : "text-(--warning)"}`}
            >
                {amount} CZK
            </p>
        </article>
    );
};

export default IncomeExpense;
