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

	const sendValue = async () => {
		try {
			if (val.trim() == "") return;

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
	};

	const HandleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		try {
			sendValue();
		} catch {}
	};

	return (
		<form
			onSubmit={HandleSubmit}
			className={`w-full h-fit card flex flex-col `}
		>
			<div
				onClick={() => {
					setMode(!mode);
				}}
				className="w-fit mb-4 flex flex-row rounded-md bg-(--bg-light) cursor-pointer"
			>
				<span
					className={`primary-btn rounded-l-md! rounded-r-none! px-4 py-2 pointer-events-none ${mode ? "" : "bg-transparent!"}`}
				>
					Income
				</span>
				<span
					className={`primary-btn rounded-r-md! rounded-l-none! px-4 py-2 pointer-events-none ${!mode ? "" : "bg-transparent!"}`}
				>
					Expense
				</span>
			</div>
			<div className="w-full flex flex-row gap-4 items-center">
				<div className="w-full flex items-center">
					<span className="translate-x-[155%] text-(--text-muted) pointer-events-none select-none">
						Kč
					</span>
					<input
						name="value"
						type="number"
						className="w-1/3 input-primary pl-10! text-xl pr-8 py-2 mr-4"
						autoComplete="off"
						placeholder="Enter amount..."
						value={val}
						onChange={(e) => setVal(e.target.value)}
					/>
					<input
						name="description"
						type="text"
						className="flex-1 input-primary text-xl pr-8 py-2 ml-px"
						autoComplete="off"
						placeholder="Enter description..."
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				</div>

				<button
					className="ml-auto primary-btn w-fit py-3 px-8"
					onClick={() => sendValue()}
					disabled={val.trim() == ""}
				>
					Save
				</button>
			</div>
		</form>
	);
}
