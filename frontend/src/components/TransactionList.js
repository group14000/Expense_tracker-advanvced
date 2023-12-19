import React, { useContext } from "react";
import { Transaction } from "./Transaction";

import { GlobalContext } from "../context/GlobalState";

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3 className="text-2xl font-semibold mb-6">History</h3>
      <ul className="list-none">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center p-4 mb-2 bg-white rounded-md shadow-md"
          >
            <div className="flex items-center">
              <span
                className={`text-lg ${
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
        ))}
      </ul>
    </>
  );
};
