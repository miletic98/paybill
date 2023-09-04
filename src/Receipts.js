import React, { useState, useEffect } from "react";
import Select from "react-select";

function Receipts({ people, onAddItem }) {
  const [prices, setPrices] = useState([]);
  const [results, setResults] = useState({});
  const [personData, setPersonData] = useState({});
  useEffect(() => {
    handleAddItem();
  }, []);

  useEffect(() => {
    fetch("https://64f63cc42b07270f705e50af.mockapi.io/api/bill/users")
      .then((response) => response.json())
      .then((data) => {
        setPersonData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleAddItem = () => {
    setPrices([...prices, { price: "", selectedPeople: [] }]);
  };

  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index].price = value;
    setPrices(newPrices);
    calculateResults(newPrices);
  };

  const handleSelectedPeopleChange = (index, selectedOptions) => {
    const newPrices = [...prices];
    newPrices[index].selectedPeople = selectedOptions.map(
      (option) => option.value
    );
    setPrices(newPrices);
    calculateResults(newPrices);
  };

  const calculateResults = (newPrices) => {
    const receiptResults = {};
    newPrices.forEach((item) => {
      if (item.price && item.selectedPeople.length > 0) {
        const pricePerPerson =
          parseFloat(item.price) / item.selectedPeople.length;
        item.selectedPeople.forEach((person) => {
          const currentAmount = parseFloat(receiptResults[person] || 0);
          const newAmount = currentAmount + pricePerPerson;
          receiptResults[person] = newAmount.toFixed(2);
        });
      }
    });
    setResults({ ...receiptResults });
  };

  return (
    <div>
      {prices.map((item, index) => (
        <div key={index} className="list_items">
          <div>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Price"
              value={item.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
            />
          </div>
          <div className="select_options">
            <label>People</label>
            <Select
              isMulti
              options={people.map((person) => ({
                value: person.name,
                label: person.name,
              }))}
              value={item.selectedPeople.map((person) => ({
                value: person,
                label: person,
              }))}
              onChange={(selectedOptions) =>
                handleSelectedPeopleChange(index, selectedOptions)
              }
            />
          </div>
        </div>
      ))}
      <button onClick={handleAddItem}>Add Item</button>
      {Object.keys(results).length > 0 && (
        <div className="results">
          <div className="result-row">
            <div className="result-column">
              <span className="heading">NAME</span>
              {Object.keys(results).map((person) => (
                <span key={person}>{person}</span>
              ))}
            </div>
            <div className="result-column">
              <span className="heading">PAY</span>
              {Object.keys(results).map((person) => (
                <span key={person}>${results[person]}</span>
              ))}
            </div>
            <div className="result-column">
              <span className="heading">IBAN</span>
              {Object.keys(results).map((person) => (
                <span key={person}>
                  {personData.find((data) => data.name === person)?.iban ||
                    "N/A"}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Receipts;
