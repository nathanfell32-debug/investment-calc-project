export function calculateInvestmentResults(
    {
        initialInvestment,
        annualInvestment,
        expectedReturn,
        duration
    }
){

    const annualData=[];
    let investmentValue=initialInvestment;
    let totalInterest = 0;
    let investedCap = initialInvestment;

    for(let i = 0; i< duration; i++){
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        totalInterest += interestEarnedInYear;
        investedCap += annualInvestment;
        investmentValue += interestEarnedInYear + annualInvestment;
        annualData.push({
            year: i+1,
            interest: interestEarnedInYear,
            investmentValue: investmentValue,
            totalInterest: totalInterest,
            investedCapital: investedCap,
        });
    }
    return annualData
}

export function calculateMonthlyResults({
    initialInvestment,
    annualInvestment,
    expectedReturn,
    duration
}) {
    const monthlyData = [];
    let investmentValue = initialInvestment;
    let totalInterest = 0;
    let investedCap = initialInvestment;

    const monthlyReturnRate = (expectedReturn / 100) / 12;
    const monthlyInvestment = annualInvestment / 12;
    const totalMonths = duration * 12;

    for (let i = 0; i < totalMonths; i++) {
        const interestEarned = investmentValue * monthlyReturnRate;
        totalInterest += interestEarned;
        investedCap += monthlyInvestment;
        investmentValue += interestEarned + monthlyInvestment;

        monthlyData.push({
            month: i + 1,
            interest: interestEarned,
            investmentValue,
            totalInterest,
            investedCapital: investedCap
        });
    }

    return monthlyData;
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
