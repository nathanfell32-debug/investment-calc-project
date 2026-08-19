import React from 'react'
import { calculateInvestmentResults, calculateMonthlyResults, formatter } from '../util/investments';
import { generatePDF } from "../util/generateReport";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const OutputData = ({ inputValue, comparisonValue, error, comparisonError }) => {
    const [loading, setLoading] = React.useState(false);
    const [viewMode, setViewMode] = React.useState("yearly");

    React.useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, comparisonValue, viewMode]);

    //error handling 
    if (error) {
        return <p className="error">{error}</p>;
    }

    if (comparisonError) {
        return <p className="error">{comparisonError}</p>;
    }

    if (inputValue.duration <= 0) {
        return <p>Please enter a duration greater than zero.</p>;
    }


    const resultData = React.useMemo(() => {
    return viewMode === "yearly" 
    ? calculateInvestmentResults(inputValue) 
    : calculateMonthlyResults(inputValue);
    }, [inputValue, viewMode]);

    //comparison scenario dataset
    const comparisonData = React.useMemo(() => {
        return viewMode === "yearly"
        ? calculateInvestmentResults(comparisonValue)
        : calculateMonthlyResults(comparisonValue);
    }, [comparisonValue, viewMode]);

    if (loading) {
        return <p>Loading results...</p>;
    }

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

     {/* Main scenario table */}
            <h3>Main Scenario</h3>
            <table id="result">
                <thead>
                    <tr>
                        <th>{viewMode === "yearly" ? "Year" : "Month"}</th>
                        <th>Investment Value</th>
                        <th>Interest</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>

                <tbody>
                    {resultData.map((row) => (
                        <tr key={viewMode === "yearly" ? row.year : row.month}>
                            <td>{viewMode === "yearly" ? row.year : row.month}</td>
                            <td>{formatter.format(row.investmentValue)}</td>
                            <td>{formatter.format(row.interest)}</td>
                            <td>{formatter.format(row.totalInterest)}</td>
                            <td>{formatter.format(row.investedCapital)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary */}
            <div id="summary">
                <h3>Summary</h3>
                <p><strong>Total Invested Capital:</strong> {formatter.format(totalInvested)}</p>
                <p><strong>Total Interest Earned:</strong> {formatter.format(totalInterestEarned)}</p>
            </div>

            {/* Comparison table */}
            <div id="comparison-table">
                <h3>Comparison Scenario</h3>

                <table>
                    <thead>
                        <tr>
                            <th>{viewMode === "yearly" ? "Year" : "Month"}</th>
                            <th>Investment Value</th>
                            <th>Interest</th>
                            <th>Total Interest</th>
                            <th>Invested Capital</th>
                        </tr>
                    </thead>

                    <tbody>
                        {comparisonData.map((row) => (
                            <tr key={viewMode === "yearly" ? row.year : row.month}>
                                <td>{viewMode === "yearly" ? row.year : row.month}</td>
                                <td>{formatter.format(row.investmentValue)}</td>
                                <td>{formatter.format(row.interest)}</td>
                                <td>{formatter.format(row.totalInterest)}</td>
                                <td>{formatter.format(row.investedCapital)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* DUAL-LINE CHART */}
            <div id="chart-container" style={{ width: "100%", height: "300px", marginTop: "2rem" }}>
                <ResponsiveContainer>
                    <LineChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={viewMode === "yearly" ? "year" : "month"} />
                        <YAxis />
                        <Tooltip formatter={(value) => formatter.format(value)} />

                        {/* Main scenario line */}
                        <Line
                            type="monotone"
                            dataKey="investmentValue"
                            data={resultData}
                            stroke="#4e73df"
                            strokeWidth={2}
                            dot={false}
                        />

                        {/* Comparison scenario line */}
                        <Line
                            type="monotone"
                            dataKey="investmentValue"
                            data={comparisonData}
                            stroke="#e74a3b"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* PDF BUTTON */}
            <div id="pdf-download">
                <button onClick={() => generatePDF(resultData, viewMode)}>
                    Download PDF Report
                </button>
            </div>
        </>
    );
};

export default OutputData;
