import React from "react";
import Header from './components/UserInput.jsx';

function App() {
  
  return (
    <div>
      <Header title="Investment Calculator"
      subtitle="Plan your financial future with confidence" />
      <userInput onCalculate={(data) => console.log(data)} />
    </div>
  );
}

export default App;
