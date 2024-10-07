const Expense = require('../Models/Expense');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


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



// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = { splitExpense, getPastSplits,registerUser,loginUser };
