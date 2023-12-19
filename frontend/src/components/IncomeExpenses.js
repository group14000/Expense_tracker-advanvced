import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$ " +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  return (
    <div className="flex flex-col md:flex-row justify-around bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="text-center mb-4 md:mb-0">
        <h4 className="text-lg font-semibold text-green-600">Income</h4>
        <p className="text-xl text-green-600">{moneyFormatter(income)}</p>
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold text-red-600">Expense</h4>
        <p className="text-xl text-red-600">{moneyFormatter(expense)}</p>
      </div>
    </div>
  );
};
