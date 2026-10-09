"use client";
import { apiClient } from "@/api/client";
import FinanceChangeDto from "@/models/finance/FinanceChangeDto";
import React, { useState } from "react";
export default function FinanceValueForm({
    onAdd,
}: {
    onAdd: (r: FinanceChangeDto) => void;
}) {
    const [val, setVal] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [mode, setMode] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const sendValue = async () => {
        try {
            if (val.trim() == "" || submitting) return;
            setSubmitting(true);

            const value = mode ? Math.abs(Number(val)) : -Math.abs(Number(val));
            const description = desc.trim() == "" ? "Others" : desc;

            const res = await apiClient.post(
                mode ? "finance/create_income" : "finance/create_expense",
                { value, description },
            );
            onAdd({
                recordId: res.data.message,
                type: mode ? "income" : "expense",
                value,
                description,
                date: new Date().toISOString(),
                currency: "CZK",
            });

            setVal("");
            setDesc("");
        } catch {
            return "there was a problem with saving new amount";
        }
        setSubmitting(false);
    };

    const HandleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            await sendValue();
        } catch {}
    };

    return (
        <form
            onSubmit={HandleSubmit}
            className={`w-full h-fit card flex flex-col `}
        >
            <div className=" flex flex-row max-phone:flex-col">
                <h2 className="h2">Add Record </h2>
                <div
                    onClick={() => {
                        setMode(!mode);
                    }}
                    className="w-fit mb-4 flex flex-row rounded-md bg-(--bg-light) cursor-pointer ml-auto max-phone:ml-0 max-phone:mt-2"
                >
                    <span
                        className={`primary-btn btn rounded-l-md! rounded-r-none! px-2 py-1 pointer-events-none ${mode ? "" : "bg-transparent!"} max-phone:px-4 max-phone:py-2`}
                    >
                        Income
                    </span>
                    <span
                        className={`primary-btn btn rounded-r-md! rounded-l-none! px-2 py-1 pointer-events-none ${!mode ? "" : "bg-transparent!"} max-phone:px-4 max-phone:py-2`}
                    >
                        Expense
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-row gap-4 items-center">
                <div className="w-full flex items-center max-laptop:flex-col max-laptop:gap-2">
                    <div className=" flex flex-1 items-center max-laptop:w-full">
                        <span className="translate-x-[65%] absolute text-(--text-muted) pointer-events-none select-none">
                            Kč
                        </span>
                        <input
                            name="value"
                            type="number"
                            className="w-full input-primary pl-10! text-md pr-8 py-1 mr-4 max-phone:text-xl"
                            autoComplete="off"
                            placeholder="Enter amount..."
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                        />
                    </div>
                    <input
                        name="description"
                        type="text"
                        className="flex-1 input-primary text-md pr-8 py-1 ml-px max-laptop:w-full max-phone:text-xl"
                        autoComplete="off"
                        placeholder="Enter description..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
            </div>
            <button
                className="ml-auto primary-btn btn w-fit py-1 px-4 mt-2 max-phone:py-2 max-phone:px-6"
                type="submit"
                disabled={val.trim() == "" || submitting}
            >
                Save
            </button>
        </form>
    );
}
