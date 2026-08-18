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
//bonus challenge 1 error handling for invalid input
  const handleInputChange = (inputIdentifier, newValue) => {
//prevent negative or non numeric values
    if (newValue < 0 || isNaN(newValue)) {
      alert("Please enter a valid positive number.");
      return;
    }
    setUserInput(prevInput => ({
      ...prevInput,
      [inputIdentifier]: +newValue
    }));
  };
  
  return (
    <>
    <Header />
    {/* UserInput still sends changes upward */}
    <UserInput userInput={userInput} onInputChange={handleInputChange} />
    {/* OutputData receives validated input */}
    <OutputData inputValue={userInput} />
    </>
  );
}

export default App;
