import { useTransactionContext } from "@/context/TransactionProvider";

export const useTransaction = () => {
  const {
    state: { transactions },
  } = useTransactionContext();

  const date = new Date();

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const incomeThisMonth = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === currentMonth &&
        new Date(t.date).getFullYear() === currentYear &&
        t.transactionType === "income"
    )
    .reduce((curr, val) => curr + +val.total, 0);

  const expensesThisMonth = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === currentMonth &&
        new Date(t.date).getFullYear() === currentYear &&
        t.transactionType === "expenses"
    )
    .reduce((curr, val) => curr + +val.total, 0);

  const totalSpendThisMonth = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === currentMonth &&
        new Date(t.date).getFullYear() === currentYear &&
        t.transactionType === "expenses"
    )
    .reduce((curr, val) => curr + +val.total, 0);

  const totalSpendLastMonth = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === previousMonth &&
        new Date(t.date).getFullYear() === previousYear &&
        t.transactionType === "expenses"
    )
    .reduce((curr, val) => curr + +val.total, 0);

  const totalIncomeThisMonth = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === currentMonth &&
        new Date(t.date).getFullYear() === currentYear &&
        t.transactionType === "income"
    )
    .reduce((curr, val) => curr + +val.total, 0);

  const totalIncomeLastMonth = transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === previousMonth &&
        new Date(t.date).getFullYear() === previousYear &&
        t.transactionType === "income"
    )
    .reduce((curr, val) => curr + +val.total, 0);

  return {
    incomeThisMonth,
    expensesThisMonth,
    totalSpendThisMonth,
    totalSpendLastMonth,
    totalIncomeThisMonth,
    totalIncomeLastMonth,
  };
};
