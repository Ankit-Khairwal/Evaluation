import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Finance Dashboard</h1>
      <div>
        <h2>Financial Summary</h2>
        <p>Total Income: $0</p>
        <p>Total Expenses: $0</p>
        <p>Current Savings: $0</p>
        <p>Savings Goal Progress: 0%</p>
      </div>
      <div>
        <h2>Quick Links</h2>
        <Link to="/income">Add Income</Link>
        <Link to="/expenses">Add Expense</Link>
        <Link to="/transactions">View Transactions</Link>
        <Link to="/savings">Savings Progress</Link>
      </div>
    </div>
  );
};
export default Dashboard;