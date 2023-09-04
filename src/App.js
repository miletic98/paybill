import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./Input";
import Receipts from "./Receipts";
import Select from "react-select";

function App() {
  const [people, setPeople] = useState([]);
  const [prices, setPrices] = useState([]);
  const [receiptResults, setReceiptResults] = useState({});
  useEffect(() => {
    const calculateResults = () => {
      const newResults = {};
      prices.forEach((item) => {
        if (item.price && item.selectedPeople.length > 0) {
          const pricePerPerson =
            parseFloat(item.price) / item.selectedPeople.length;
          item.selectedPeople.forEach((person) => {
            const currentAmount = parseFloat(newResults[person] || 0);
            const newAmount = currentAmount + pricePerPerson;
            newResults[person] = newAmount.toFixed(2);
          });
        }
      });
      setReceiptResults(newResults);
    };

    calculateResults();
  }, [prices, people]);

  const handleAddPerson = (personName) => {
    setPeople([...people, { name: personName }]);
  };

  const handleAddReceipt = (newReceipt) => {
    setPrices([...prices, newReceipt]);
  };

  return (
    <div className="app-container">
      <h1>PayBill</h1>
      <Input onAddPerson={handleAddPerson} />
      <Receipts people={people} onAddReceipt={handleAddReceipt} />
    </div>
  );
}

export default App;
