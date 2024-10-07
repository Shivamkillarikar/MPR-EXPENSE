const express = require('express');
const { splitExpense,getPastSplits,registerUser,loginUser } = require('../Controllers/expenseController');

const router = express.Router();

// POST route for splitting expenses
router.post('/split', splitExpense);

// GET route for fetching past splits
router.get('/past-splits', getPastSplits);

router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);


  

module.exports = router;
