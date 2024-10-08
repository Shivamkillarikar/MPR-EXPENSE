const express = require('express');
const { addExpense, getExpenses } = require('../Controllers/budgetexpenseController');

const router = express.Router();

router.post('/', addExpense);
router.get('/:email', getExpenses);

module.exports = router;
