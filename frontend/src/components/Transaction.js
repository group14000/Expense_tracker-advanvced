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

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      className={`flex justify-between items-center p-4 mb-2 bg-white rounded-md shadow-md ${
        transaction.amount < 0
          ? "border-l-4 border-red-500"
          : "border-l-4 border-green-500"
      }`}
    >
      <div className="flex items-center">
        <span
          className={`text-xl ${
            transaction.amount < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {transaction.text}
        </span>
        <span
          className={`ml-4 ${
            transaction.amount < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {sign}
          {moneyFormatter(transaction.amount)}
        </span>
      </div>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="text-gray-500 hover:text-red-500 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </li>
  );
};
