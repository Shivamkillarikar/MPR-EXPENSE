const express = require('express');
const { splitExpense, getPastSplits } = require('../Controllers/expenseController');

const router = express.Router();

// POST route for splitting expenses
router.post('/split', splitExpense);

// GET route for fetching past splits
router.get('/past-splits', getPastSplits);


module.exports = router;
