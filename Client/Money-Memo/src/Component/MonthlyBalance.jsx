import { useState, useEffect } from "react";
import axios from "axios";

const MonthlyBalance = ({ expenses }) => {
    const [budget, setBudget] = useState(null);
    const [loading, setLoading] = useState(false);
    const email = 'shivam@gmail.com'; // Static email

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/budget/${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
        
                // Check if the response is ok (status code in the range 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json(); // Parse the response data as JSON
                console.log("Budget Response:", data);
                setBudget(data); // Assuming you want to set the budget state with the fetched data
            } catch (error) {
                console.error("Error fetching budget:", error);
            }
        };
        fetchBudget();
        
    }, []);

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = budget ? budget.totalBudget - totalExpenses : 0;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Monthly Balance</h2>
            <p>Balance Left to Spend: ${balance}</p>
        </div>
    );
};

export default MonthlyBalance;
