import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

 const Income = () => {
  const [income, setIncome] = useState({ amount: "", description: "", date: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "income"), income);
      alert("Income added successfully!");
      setIncome({ amount: "", description: "", date: "" });
    } catch (error) {
      console.error("Error adding income: ", error);
    }
  };

  return (
    <div>
      <h1>Add Income</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={income.amount}
          onChange={(e) => setIncome({ ...income, amount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={income.description}
          onChange={(e) => setIncome({ ...income, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={income.date}
          onChange={(e) => setIncome({ ...income, date: e.target.value })}
          required
        />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default Income;