import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Expenses = () => {
  const [expense, setExpense] = useState({ amount: "", description: "", category: "", date: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "expenses"), expense);
      alert("Expense added successfully!");
      setExpense({ amount: "", description: "", category: "", date: "" });
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  return (
    <div>
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          required
        />
        <input
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expenses;