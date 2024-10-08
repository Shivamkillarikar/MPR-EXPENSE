// controllers/expenseController.js
const Budget = require('../Models/BudgetPlanning');
const Expense = require('../Models/Expense');

exports.splitExpense = (req, res) => {
    // Logic to split expenses
    res.status(200).json({ message: 'Expenses split successfully' });
};

exports.getPastSplits = (req, res) => {
    // Logic to retrieve past splits
    res.status(200).json({ message: 'Past splits retrieved successfully' });
};

exports.registerUser = (req, res) => {
    // Logic to register a user
    res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = (req, res) => {
    // Logic to log in a user
    res.status(200).json({ message: 'User logged in successfully' });
};

