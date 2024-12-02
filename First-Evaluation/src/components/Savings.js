import React, { useState, useContext } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const Savings = () => {
  const { transactions } = useContext(FinanceContext);
  const [savingsGoal, setSavingsGoal] = useState(0);

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate current savings
  const currentSavings = totalIncome - totalExpenses;

  // Calculate savings progress
  const progress = savingsGoal > 0 ? Math.min((currentSavings / savingsGoal) * 100, 100) : 0;

  const handleSavingsGoalSubmit = (e) => {
    e.preventDefault();
    const goal = parseFloat(e.target.savingsGoal.value);
    if (!isNaN(goal) && goal > 0) {
      setSavingsGoal(goal);
    }
    e.target.reset();
  };

  return (
    <div>
      <h1>Savings</h1>
      <div>
        <h2>Current Savings</h2>
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Current Savings: ${currentSavings.toFixed(2)}</p>
      </div>

      <div>
        <h2>Set Savings Goal</h2>
        <form onSubmit={handleSavingsGoalSubmit}>
          <input
            type="number"
            name="savingsGoal"
            placeholder="Enter your savings goal"
            required
          />
          <button type="submit">Set Goal</button>
        </form>
      </div>

      <div>
        <h2>Savings Progress</h2>
        <div style={{ width: "100%", background: "#e0e0e0", borderRadius: "5px", overflow: "hidden" }}>
          <div
            style={{
              width: `${progress}%`,
              background: progress === 100 ? "green" : "blue",
              color: "white",
              textAlign: "center",
              padding: "5px 0",
              borderRadius: "5px",
            }}
          >
            {progress.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
