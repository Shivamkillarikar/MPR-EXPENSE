const mongoose = require('mongoose');

// Create Budget schema
const budgetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    totalBudget: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
