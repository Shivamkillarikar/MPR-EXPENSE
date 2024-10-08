const Budget = require('../Models/Budget');

// Create or update budget
const createOrUpdateBudget = async (req, res) => {
    const { email, totalBudget } = req.body;

    try {
        const budget = await Budget.findOneAndUpdate(
            { email },
            { totalBudget },
            { new: true, upsert: true } // Create new if not found
        );
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get budget for a user
const getBudget = async (req, res) => {
    const { email } = req.params;

    try {
        const budget = await Budget.findOne({ email });
        if (!budget) return res.status(404).json({ message: 'Budget not found' });
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrUpdateBudget, getBudget };
