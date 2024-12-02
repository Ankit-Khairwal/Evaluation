src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Transactions from "./components/Transactions";
import Savings from "./components/Savings";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;