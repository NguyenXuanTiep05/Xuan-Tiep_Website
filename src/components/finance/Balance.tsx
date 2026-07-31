"use client";
import React from "react";

const Balance = ({ amount }: { amount: number }) => {
    return (
        <article className="w-full card">
            <h2 className="h3 text-(--text-lighter)">Balance</h2>
            <p
                className={`h2 ${amount > 0 ? "text-(--success)" : "text-(--warning)"}`}
            >
                {amount} CZK
            </p>
        </article>
    );
};

export default Balance;
