import jsPDF from "jsPDF";

export function generatePDF(resultData, viewMode) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Investment Report", 10, 10);

    doc.setFontSize(12);
    doc.text(`View Mode: ${viewMode === "yearly" ? "Yearly" : "Monthly"}`, 10, 20);

    let y = 30;

    resultData.forEach((row) => {
        const label = viewMode === "yearly" ? `Year ${row.year}` : `Month ${row.month}`;
        const line = `${label} | Value: £${row.investmentValue.toFixed(2)} | Interest: £${row.interest.toFixed(2)}`;

        doc.text(line, 10, y);
        y += 10;

        //prevent text going off the page
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
    });

    doc.save("investment-report.pdf");
}