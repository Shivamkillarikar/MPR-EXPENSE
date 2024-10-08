// src/components/BudgetForm.jsx
import { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ setBudget, email }) => {
    const [totalBudget, setTotalBudget] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/budget', { email, totalBudget });
            console.log("Budget API Response:", response.data); // Log response
            setBudget(response.data);
            alert('Budget saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving budget');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Email: {email}</p> {/* Display static email */}
            <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                placeholder="Enter your total budget"
                required
            />
            <button type="submit">Save Budget</button>
        </form>
    );
};

export default BudgetForm;
