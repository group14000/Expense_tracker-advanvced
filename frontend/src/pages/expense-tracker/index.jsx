import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction, deleteTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    // Call the deleteTransaction function with the transaction id
    deleteTransaction(id);
  };

  return (
    <>
      <div className="expense-tracker bg-gray-100 p-4 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            {name}'s Expense Tracker
          </h1>
          <div className="balance bg-white p-4 md:p-6 rounded-md shadow-md mb-4">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Your Balance
            </h3>
            {balance >= 0 ? (
              <h2 className="text-2xl md:text-3xl text-green-500">
                ${balance}
              </h2>
            ) : (
              <h2 className="text-2xl md:text-3xl text-red-500">
                -${balance * -1}
              </h2>
            )}
          </div>
          <div className="summary flex gap-4 md:gap-8">
            <div className="income bg-white p-4 md:p-6 rounded-md shadow-md flex-1">
              <h4 className="text-lg md:text-xl font-semibold mb-2">Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses bg-white p-4 md:p-6 rounded-md shadow-md flex-1">
              <h4 className="text-lg md:text-xl font-semibold mb-2">
                Expenses
              </h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form
            className="add-transaction bg-white p-4 md:p-6 rounded-md shadow-md mb-4"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="mb-2 p-2 w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="mb-2 p-2 w-full"
            />
            <div className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense" className="text-sm md:text-base">
                Expense
              </label>
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income" className="text-sm md:text-base">
                Income
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add Transaction
            </button>
          </form>
          {profilePhoto && (
            <div className="profile flex items-center justify-between bg-white p-4 md:p-6 rounded-md shadow-md mb-4">
              <img
                className="profile-photo w-1/4 md:w-1/5 rounded-full"
                src={profilePhoto}
                alt="Profile"
              />
              <button
                className="sign-out-button bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={signUserOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="transactions bg-white p-4 md:p-8 rounded-md shadow-md">
        <h3 className="text-2xl md:text-4xl font-bold mb-4">Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => {
            const { id, description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={id} className="mb-2 flex justify-between items-center">
                <div>
                  <h4 className="text-lg md:text-xl font-semibold">
                    {description}
                  </h4>
                  <p>
                    ${transactionAmount} •{" "}
                    <label
                      className={`${
                        transactionType === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transactionType}
                    </label>
                  </p>
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
