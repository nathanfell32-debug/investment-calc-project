import React from 'react'
import { calculateInvestmentResults, calculateMonthlyResults, formatter } from '../util/investments';

const OutputData = ({ inputValue }) => {

    const [viewMode, setViewMode] = React.useState("yearly");

    //error handling
    if (inputValue.duration <= 0) {
        return <p>Please enter a duration greater than zero.</p>;
    }

    const resultData = viewMode === "yearly" ? calculateInvestmentResults(inputValue) : calculateMonthlyResults(inputValue);

    //bonus challenge - highest interest highlight
    const highestInterest = Math.max(...resultData.map(item => item.interest));
    //bonus challenge summary values
    const finalYear = resultData[resultData.length - 1];
    const totalInvested = finalYear.investedCapital;
    const totalInterestEarned = finalYear.totalInterest;
    
    return (
      <>

      <div id="view-toggle">
        <button
        onClick={() => setViewMode("yearly")}
        className={viewMode === "yearly" ? "active" : ""}
        >Yearly View</button>

        <button
        onClick={() => setViewMode("monthly")}
        className={viewMode === "monthly" ? "active" : ""}
        >Monthly View</button>
      </div>

        <table id="result">
            <thead>
                <tr>
                    <th>{viewMode === "yearly" ? "Year" : "Month"}</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>

            <tbody>
                {resultData.map((yearData) => {

                return (
                    <tr
                    key={yearData.year}
                    className={
                        yearData.interest === highestInterest ? "highlight" : ""
                    }
                  >
                        <td>{viewMode === "yearly" ? yearData.year : yearData.month}</td>
                        <td>{formatter.format(yearData.investmentValue)}</td>
                        <td>{formatter.format(yearData.interest)}</td>
                        <td>{formatter.format(yearData.totalInterest)}</td>
                        <td>{formatter.format(yearData.investedCapital)}</td>
                    </tr>
                );
              })}
            </tbody>
        </table>

        {/* bonus challenge summary section */}
        <div id="summary">
            <h3>Summary</h3>
            <p><strong>Total Invested Capital:</strong> {formatter.format(totalInvested)}</p>
            <p><strong>Total Interest Earned:</strong> {formatter.format(totalInterestEarned)}</p>
        </div>
     </>
    );
};

export default OutputData;
