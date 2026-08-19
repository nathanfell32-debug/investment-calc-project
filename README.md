The project - A simple, interactive investment calculator built with React and Vite.
It allows users to explore how an investment grows over time, with both yearly and monthly breakdowns.

Investment Calculator – Header Component
A practical React Essentials project built as part of the ITonlinelearning curriculum. This module introduces component structure, props, asset handling, and responsive design in React.

Features
Reusable Header component

Customizable title and subtitle via props

Logo asset imported and rendered

Responsive layout (mobile + desktop)

Clean component structure using Vite + React

Activity 26 - Create a User Input Component for an Investment Calculator App. This update to activity 25 (header component) adds the "user input form" for the investment calculator project. the component introduces controlled inputs, state management, form handling, and basic validation. 

What was added - UserInput.jsx component, controlled form fields using useState, handleChange and handleSubmit logic, basic css styling for the form, integration with onCalculate callback.

activity 27 - Create an Output Component for the Investment Calculator App. building upon the previous activity and the investment calculator project.

what was added - added investment results table, added input validation (bonus challenge)

activity 28 - Implement a Results Table for the Investment Calculator App - building upon activity 25 - 

Dynamic investment table, calculates and displays investment growth over the selected duration.

yearly/monthly view toggle - switch between yearly and monthly breakdowns instantly.

automatic calculation - investment value, interest earned, total interest, total invested capital.

highlighting - automatically highlights the row with the highest interest earned.

The calculator uses user inputs: initial investments, annual investment, expected return (%), duration(years), these values are processed through custom utility functions such as - calculateInvestmentResults() for yearly breakdown and calculateMonthlyResults() for monthly breakdowns.

currency formatting is handled via a shared formatter utility.
