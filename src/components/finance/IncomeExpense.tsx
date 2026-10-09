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
        <article
            className={`w-[50%] card ${left ? "ml-auto text-right" : ""} max-laptop:w-full max-laptop:text-left`}
        >
            <h2 className="h4 text-(--text-lighter)">{title}</h2>
            <p
                className={`h3 ${amount > 0 ? "text-(--success-text)" : "text-(--warning-text)"}`}
            >
                {amount} CZK
            </p>
        </article>
    );
};

export default IncomeExpense;
