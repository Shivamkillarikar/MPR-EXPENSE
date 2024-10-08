const mongoose = require('mongoose');

// Create Expense schema
const expenseSchema = new mongoose.Schema({
    email: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ExpenseBudget = mongoose.model('ExpenseBudget', expenseSchema);

module.exports = ExpenseBudget;
