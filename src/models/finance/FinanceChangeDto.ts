export default interface FinanceChangeDto {
    recordId: number;
    value: number;
    currency: string;
    description: string;
    date: string;
    type: string;
}
