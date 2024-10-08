// src/Component/SetBudget.jsx
import { useState } from 'react';
import axios from 'axios';

const SetBudget = ({ setBudget }) => {
    const [email, setEmail] = useState('');
    const [totalBudget, setTotalBudget] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/budget', { email, totalBudget });
            setBudget(response.data); // Update the budget state
            alert('Budget saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving budget');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
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

export default SetBudget;
