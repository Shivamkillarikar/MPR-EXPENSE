const express = require('express');
// const Budget = require('../Models/BudgetPlanning');
const Expense = require('../Models/Expense');
const {
    splitExpense,
    getPastSplits,
    registerUser,
    loginUser
    // updateBudget,
    // addExpensee
} = require('../Controllers/expenseController');

const router = express.Router();

// POST route for splitting expenses
router.post('/split', splitExpense);

// GET route for fetching past splits
router.get('/past-splits', getPastSplits);

// POST route for registering a user
router.post('/register', registerUser);

// POST route for logging in a user
router.post('/login', loginUser);

// PUT route for setting budget
// router.put('/setBudget', updateBudget);

// POST route for adding an expense
 //router.post('/add', addExpensee);

module.exports = router;
