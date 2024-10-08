const express = require('express');
const { createOrUpdateBudget, getBudget } = require('../controllers/budgetController');

const router = express.Router();

router.post('/', createOrUpdateBudget);
router.get('/:email', getBudget);

module.exports = router;
