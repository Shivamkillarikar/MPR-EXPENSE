// components/AddExpense.js
import { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
    const [email, setEmail] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/budget/addExpense', { email, totalAmount });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="number" 
                placeholder="Enter expense amount" 
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)} 
                required 
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpense;
