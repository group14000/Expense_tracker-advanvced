import { useState, useEffect } from "react";
import "./ExpenseTrackerForm.css";

const ExpenseTrackerForm = () => {
  const [spentAmount, setSpentAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [showPremiumButton, setShowPremiumButton] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Add the entered expense to the expenses list
    const newExpense = {
      spentAmount,
      description,
      category,
    };

    // Save the new expense to Firebase
    try {
      const response = await fetch(
        "https://expense-tracker-advanced-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (response.ok) {
        setExpenses([...expenses, { ...newExpense, id: response.name }]);
        // Clear the form fields
        setSpentAmount("");
        setDescription("");
        setCategory("");

        // Check if spentAmount is greater than or equal to 10000 to show Premium Button
        setShowPremiumButton(parseInt(spentAmount) >= 10000);
      } else {
        console.error("Failed to add expense to the database.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (index) => {
    // Remove the expense from the local state
    const updatedExpenses = [...expenses];
    const deletedExpense = updatedExpenses.splice(index, 1)[0];
    setExpenses(updatedExpenses);

    // Delete the expense from Firebase
    try {
      const response = await fetch(
        `https://expense-tracker-advanced-default-rtdb.firebaseio.com/expenses/${deletedExpense.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Expense successfully deleted");
      } else {
        console.error("Failed to delete expense from the database.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (index) => {
    // Handle editing functionality in the UI (you can use a modal or a form)
    // For simplicity, let's just log the details for now
    const expenseToEdit = expenses[index];
    console.log("Editing expense:", expenseToEdit);
  };

  const handlePremiumButtonClick = () => {
    // Toggle the background mode when Premium Button is clicked
    setIsDarkMode(!isDarkMode);
  };

  const handleDownloadButtonClick = () => {
    // Create a CSV file from expenses data and trigger download
    const csvData = expenses.map(
      (expense) =>
        `${expense.spentAmount},${expense.description},${expense.category}\n`
    );
    const csvContent = "Amount,Description,Category\n" + csvData.join("");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "expenses.csv";
    link.click();
  };

  useEffect(() => {
    // Fetch expenses from Firebase on component mount
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-advanced-default-rtdb.firebaseio.com/expenses.json"
        );

        if (response.ok) {
          const data = await response.json();
          if (data) {
            const expensesList = Object.values(data);
            setExpenses(expensesList);
          }
        } else {
          console.error("Failed to fetch expenses from the database.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className={`expense-tracker-form ${isDarkMode ? "dark-mode" : ""}`}>
      <form onSubmit={handleFormSubmit}>
        <label>
          Spent Amount:
          <input
            type="text"
            value={spentAmount}
            onChange={(e) => setSpentAmount(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Recharge">Recharge</option>
            {/* Add more categories as needed */}
          </select>
        </label>
        <button type="submit">Add Expense</button>
      </form>

      {expenses.length > 0 && (
        <div className="expense-list">
          <h2>Expenses:</h2>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                <strong>Amount:</strong> {expense.spentAmount},{" "}
                <strong>Description:</strong> {expense.description},{" "}
                <strong>Category:</strong> {expense.category}
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPremiumButton && (
        <div className="premium-section">
          <button onClick={handlePremiumButtonClick}>Toggle Premium</button>
          <button onClick={handleDownloadButtonClick}>Download File</button>
        </div>
      )}
    </div>
  );
};

export default ExpenseTrackerForm;
