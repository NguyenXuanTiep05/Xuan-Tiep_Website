import FinanceSummaryDto from "./FinanceSummaryDto";
import FinanceChangeDto from "./FinanceChangeDto";

export default interface FinanceOverviewDto{
	income: FinanceChangeDto[];
	expenses: FinanceChangeDto[];
	summary: FinanceSummaryDto;
}