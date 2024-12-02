// FinanceContext.js
import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    });
    return () => unsubscribe();
  }, []);

  const addTransaction = async (transaction) => {
    await addDoc(collection(db, "transactions"), transaction);
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </FinanceContext.Provider>
  );
};
