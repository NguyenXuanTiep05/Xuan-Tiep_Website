"use client";

const IncomeExpense = ({ amounts }: { amounts: number[] }) => {
    return (
        <article className="w-full flex-1 card flex flex-col gap-4">
            <div className="w-full mb-auto">
                <h2 className="h3 text-(--text-lighter)">Balance</h2>
                <p
                    className={`h2 ${amounts[0] > 0 ? "text-(--success-text)" : "text-(--warning-text)"}`}
                >
                    {amounts[0]} CZK
                </p>
            </div>
            <div className="flex max-laptop:flex-col max-tablet:flex-row max-phone:flex-col">
                <div
                    className={`w-[50%] ml-auto max-laptop:w-full max-laptop:text-left`}
                >
                    <h2 className="h4 text-(--text-lighter)">Income</h2>
                    <p
                        className={`h3 ${amounts[1] > 0 ? "text-(--success-text)" : "text-(--warning-text)"}`}
                    >
                        {amounts[1]} CZK
                    </p>
                </div>
                <div
                    className={`w-[50%] text-right max-laptop:w-full max-laptop:text-left`}
                >
                    <h2 className="h4 text-(--text-lighter)">Expenses</h2>
                    <p
                        className={`h3 ${amounts[2] > 0 ? "text-(--success-text)" : "text-(--warning-text)"}`}
                    >
                        {amounts[2]} CZK
                    </p>
                </div>
            </div>
        </article>
    );
};

export default IncomeExpense;
