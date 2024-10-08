import { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ setExpenses }) => {
    const [email, setEmail] = useState('');  // State for email
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/expenses', { email, description, amount });
            // Append the new expense to the current list of expenses
            setExpenses((prevExpenses) => [...prevExpenses, response.data]);
            alert('Expense added successfully!');
            // Reset form fields
            setEmail('');
            setDescription('');
            setAmount(0);
        } catch (error) {
            console.error(error);
            alert('Error adding expense');
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
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter expense description"
                required
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))} // Ensure amount is a number
                placeholder="Enter expense amount"
                required
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
