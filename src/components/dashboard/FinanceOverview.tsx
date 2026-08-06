"use client";
import "../../assets/FinanceOverview.css";
import FinanceSummaryDto from "@/models/finance/FinanceSummaryDto";

import { apiClient } from "@/api/client";

import { useEffect, useState } from "react";

import InfoTooltip from "../shared/InfoTooltip";
import axios from "axios";
const FinanceOverview = () => {
    const [data, setData] = useState<FinanceSummaryDto>({
        totalIncome: 0,
        totalExpenses: 0,
        currency: "CZK",
    });
    const [err, setErr] = useState("");
    useEffect(() => {
        const controller = new AbortController();
        apiClient
            .get(`/finance/summary`, {})
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                if (axios.isCancel(error)) return;
                setErr(error.message);
            });

        return () => controller.abort();
    }, []);

    const income = data!.totalIncome;
    const expenses = data!.totalExpenses;
    const curr = data!.currency;
    const procent = (Math.abs(expenses) * 100) / income;

    return (
        <article className="w-[30%] card self-start">
            <div className="flex flex-row">
                <h2 className="flex items-center gap-2 h2">
                    {err != "" ? <InfoTooltip text={err} /> : ""}
                    Finance Overview
                </h2>
            </div>

            <div className="mt-5 mb-1 w-full flex flex-row">
                <h3 className="font-medium text-md">Spending</h3>
                <h3 className="ml-auto font-medium text-md text-(--success)">
                    {expenses} {curr}
                </h3>
            </div>
            <div className="w-full h-4 bg-(--bg-light) rounded-md overflow-hidden">
                <div
                    className="fill h-full bg-(--warning)"
                    style={{ width: `${procent}%` }}
                ></div>
            </div>
            <div className="mt-5 mb-1 w-full flex flex-row">
                <h3 className="font-medium text-md">Income</h3>
                <h3 className="ml-auto font-medium text-md text-(--success)">
                    {income} {curr}
                </h3>
            </div>

            <div className=" w-full h-4 bg-(--bg-light) rounded-md overflow-hidden">
                <div className="fill w-full h-full bg-(--success)"></div>
            </div>
        </article>
    );
};

export default FinanceOverview;
