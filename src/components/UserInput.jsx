import React, { useState } from 'react';

const UserInput = ({ userInput, onInputChange }) => {
  const [currency, setCurrency] = useState("USD");

  function handleChange(event) {
    const { name, value } = event.target;

    //send updated values upward to App.jsx
    onInputChange(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    //basic validation bonus challenge
    if (
      userInput.initialInvestment <= 0 ||
      userInput.annualInvestment <= 0 ||
      userInput.expectedReturn <= 0 ||
      userInput.duration <= 0
    ) {
      alert("Please enter positive values for all fields.");
      return;
    }

    alert("Values submitted successfully!");
  }

  function handleReset() {
    setUserInput({
      initialInvestment: "",
      annualInvestment: "",
      expectedReturn: "",
      duration: ""
    });
    setCurrency("USD");
  }

  return(
    <form id="user-input" onSubmit={handleSubmit}>

      <div className="input-group">
        <label>Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <div className="input-group">
        <label>Initial Investment</label>
        <input
        type="number"
        name="initialInvestment"
        value={userInput.initialInvestment}
        onChange={handleChange}/>
      </div>

      <div className="input-group">
        <label>Annual Investment</label>
        <input
        type="number"
        name="annualInvestment"
        value={userInput.annualInvestment}
        onChange={handleChange}/>
      </div>

      <div className="input-group">
        <label>Expected Return</label>
        <input
        type="number"
        name="expectedReturn"
        value={userInput.expectedReturn}
        onChange={handleChange}/>
      </div>

      <div className="input-group">
      <label>Duration</label>
      <input
      type="number"
      name="duration"
      value={userInput.duration}
      onChange={handleChange} />
      </div>

      <button type="submit">Calculate</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  ); 
};

export default UserInput;