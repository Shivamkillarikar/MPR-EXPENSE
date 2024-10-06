const Expense = require('../Models/Expense');

// Group splitting logic
const splitExpenseGroup = (totalAmount, members) => {
    const numberOfMembers = members.length;
    const individualShare = totalAmount / numberOfMembers;
    return members.map(member => ({
        member: member,
        share: individualShare.toFixed(2),
    }));
};

// Pair splitting logic
const splitExpensePair = (totalAmount, member1, member2) => {
    const halfShare = totalAmount / 2;
    return [
        { member: member1, share: halfShare.toFixed(2) },
        { member: member2, share: halfShare.toFixed(2) },
    ];
};

// Handle splitting logic
const splitExpense = async (req, res) => {
    const { totalAmount, members, splitType } = req.body;
    let splitResult;

    if (splitType === 'pair') {
        if (members.length !== 2) {
            return res.status(400).json({ error: "Exactly two members are required for pair splitting." });
        }
        splitResult = splitExpensePair(totalAmount, members[0], members[1]);
    } else if (splitType === 'group') {
        if (members.length < 2) {
            return res.status(400).json({ error: "At least two members are required for group splitting." });
        }
        splitResult = splitExpenseGroup(totalAmount, members);
    } else {
        return res.status(400).json({ error: "Invalid split type." });
    }

    const newExpense = new Expense({ totalAmount, members, splitType, splitResult });
    await newExpense.save();
    res.json(splitResult);
};

// Fetch past splits
const getPastSplits = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch past splits' });
    }
};

module.exports = { splitExpense, getPastSplits };
