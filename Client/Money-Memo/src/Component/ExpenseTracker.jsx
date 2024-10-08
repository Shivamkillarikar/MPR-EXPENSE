import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState(''); // New state for custom category
    const [date, setDate] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await axios.get(API_URL);
            setExpenses(response.data);
        };
        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount <= 0) {
            alert('Amount must be greater than zero.');
            return;
        }

        const finalCategory = category === 'Other' ? customCategory : category; // Use custom category if "Other" is selected

        const newExpense = {
            name,
            amount: parseFloat(amount),
            category: finalCategory,
            date,
        };

        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, newExpense);
                setExpenses(expenses.map(expense => (expense._id === editId ? { ...expense, ...newExpense } : expense)));
                setEditId(null);
            } else {
                const response = await axios.post(API_URL, newExpense);
                setExpenses([...expenses, response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Error adding/updating expense:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleEdit = (expense) => {
        setName(expense.name);
        setAmount(expense.amount);
        setCategory(expense.category);
        setCustomCategory(expense.category === 'Other' ? expense.customCategory : ''); // Set custom category if "Other"
        setDate(expense.date);
        setEditId(expense._id);
    };

    const resetForm = () => {
        setName('');
        setAmount('');
        setCategory('');
        setCustomCategory('');
        setDate('');
        setEditId(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Expense Name"
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        if (e.target.value !== 'Other') {
                            setCustomCategory(''); // Clear custom category if not 'Other'
                        }
                    }}
                    required
                    className="border p-2 rounded w-full mb-2"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
                {category === 'Other' && ( // Show custom category input if 'Other' is selected
                    <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Specify custom category"
                        className="border p-2 rounded w-full mb-2"
                    />
                )}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    {editId ? 'Update Expense' : 'Add Expense'}
                </button>
            </form>
            <div className="expense-table">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Expense Name</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(expense => (
                            <tr key={expense._id}>
                                <td className="border p-2">{expense.name}</td>
                                <td className="border p-2">₹{expense.amount.toFixed(2)}</td>
                                <td className="border p-2">{expense.category}</td>
                                <td className="border p-2">{new Date(expense.date).toLocaleDateString()}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleEdit(expense)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(expense._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-amount mt-4">
                    <strong>Total: </strong> ₹<span id="total-amount">{expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
