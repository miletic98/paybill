import React, { useState } from "react";

function Input({ onAddPerson }) {
  const [personName, setPersonName] = useState("");

  const handleAddPerson = () => {
    if (personName) {
      onAddPerson(personName);
      setPersonName("");
    }
  };

  return (
    <div className="input">
      <div className="input_label">
        <label>Add person</label>
        <input
          type="text"
          placeholder="Enter Person Name"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
      </div>
      <button onClick={handleAddPerson}>Add</button>
    </div>
  );
}

export default Input;
