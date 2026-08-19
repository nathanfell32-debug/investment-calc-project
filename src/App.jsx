import React, { useState } from "react";
import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import OutputData from './components/OutputData.jsx'

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const [comparisonInput, setComparisonInput] = useState({
    initialInvestment: 8000,
    annualInvestment: 1000,
    expectedReturn: 5,
    duration: 10
  });
//bonus challenge 1 error handling for invalid input
  const [error, setError] = useState("");
  const [comparisonError, setComparisonError] = useState("");

  const handleInputChange = (inputIdentifier, newValue) => {
//prevent negative or non numeric values
    if (newValue < 0) {
      setError("Values cannot be negative.");
      return;
    }

    if (inputIdentifier === "duration" && +newValue < 1) {
      setError("Duration must be at least 1 year.");
    } else {
      setError("");
    }
    
    setUserInput(prevInput => ({
      ...prevInput,
      [inputIdentifier]: +newValue
    }));
  };
  
  const handleComparisonChange = (inputIdentifier, newValue) => {
    if (newValue < 0) {
      setComparisonError("Values cannot be negative.");
      return;
    }

    if (inputIdentifier === "duration" && +newValue < 1) {
      setComparisonError("Duration must be at least 1 year.");
    } else {
      setComparisonError("");
    }

    setComparisonInput(prevInput => ({
      ...prevInput,
      [inputIdentifier]: +newValue
    }));
  };

  return (
    <>
    <Header />
    
    <UserInput 
    userInput={userInput} 
    onInputChange={handleInputChange}
    title="Main Scenario" />

    <UserInput
    userInput={comparisonInput}
    onInputChange={handleComparisonChange}
    title="Comparison Scenario" />
    
    <OutputData 
    inputValue={userInput} 
    comparisonValue={comparisonInput}
    error={error}
    comparisonError={comparisonError} />
    </>
  );
}

export default App;
