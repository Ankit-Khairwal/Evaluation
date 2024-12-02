import React, { useContext, useState } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const Transactions = () => {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  const [sortField, setSortField] = useState("date");
  const [filter, setFilter] = useState({ type: "all", category: "", dateRange: { from: "", to: "" } });

  // Sorting Logic
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortField === "amount") return b.amount - a.amount;
    if (sortField === "date") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  // Filtering Logic
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const matchesType = filter.type === "all" || transaction.type === filter.type;
    const matchesCategory = !filter.category || transaction.category === filter.category;
    const matchesDate =
      (!filter.dateRange.from || new Date(transaction.date) >= new Date(filter.dateRange.from)) &&
      (!filter.dateRange.to || new Date(transaction.date) <= new Date(filter.dateRange.to));

    return matchesType && matchesCategory && matchesDate;
  });

  return (
    <div>
      <h1>Transactions</h1>

      {/* Filter Options */}
      <div>
        <label>Type: </label>
        <select onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Category: </label>
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />

        <label>Date From: </label>
        <input
          type="date"
          onChange={(e) => setFilter({ ...filter, dateRange: { ...filter.dateRange, from: e.target.value } })}
        />

        <label>Date To: </label>
        <input
          type="date"
          onChange={(e) => setFilter({ ...filter, dateRange: { ...filter.dateRange, to: e.target.value } })}
        />
      </div>

      {/* Sort Options */}
      <div>
        <label>Sort By: </label>
        <select onChange={(e) => setSortField(e.target.value)}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>

      {/* Transactions List */}
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            <div>
              <strong>{transaction.type.toUpperCase()}</strong> - ${transaction.amount}
              <p>{transaction.description}</p>
              <p>{transaction.date}</p>
              {transaction.category && <p>Category: {transaction.category}</p>}
            </div>
            <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
