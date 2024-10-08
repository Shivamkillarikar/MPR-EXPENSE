const ExpenseBudget = require('../Models/ExpenseBudget');

// Add a new expense
const addExpense = async (req, res) => {
    const { email, description, amount } = req.body;
    console.log(req.body);
    try {
        const expense = new ExpenseBudget({ email, description, amount });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all expenses for a user
const getExpenses = async (req, res) => {
    const { email } = req.params;

    try {
        const expenses = await ExpenseBudget.find({ email });
        console.log(expenses);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addExpense, getExpenses };
