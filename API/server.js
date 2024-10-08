const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const budgetexpenseRoute = require('./Routes/budgetexpenseRoute');
const budgetRoutes = require('./Routes/budgetRoutes')
const TrackerRoue=require("./Routes/trackerRoue");
require("dotenv").config()



// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/budget', budgetRoutes);
//app.use('/api/expenses', budgetexpenseRoute);
app.use('/api/expenses', TrackerRoue);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/splikaro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//const mongoose = require('mongoose');

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected successfully!');
// })
// .catch((err) => {
//   console.error('MongoDB connection error:', err);
// });





// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});




// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const Expense = require('./Models/Expense'); // Ensure you have a corresponding Expense model

// Initialize app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/splikaro', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Group splitting logic
// function splitExpenseGroup(totalAmount, members) {
//     const numberOfMembers = members.length;
//     const individualShare = totalAmount / numberOfMembers;

//     return members.map(member => ({
//         member: member,
//         share: individualShare.toFixed(2),
//     }));
// }

// // Pair splitting logic
// function splitExpensePair(totalAmount, member1, member2) {
//     const halfShare = totalAmount / 2;

//     return [
//         { member: member1, share: halfShare.toFixed(2) },
//         { member: member2, share: halfShare.toFixed(2) },
//     ];
// }

// API route for splitting expenses
// app.post('/api/split', async (req, res) => {
//     const { totalAmount, members, splitType } = req.body;

//     let splitResult;
//     if (splitType === 'pair') {
//         if (members.length !== 2) {
//             return res.status(400).json({ error: "Exactly two members are required for pair splitting." });
//         }
//         splitResult = splitExpensePair(totalAmount, members[0], members[1]);
//     } else if (splitType === 'group') {
//         if (members.length < 2) {
//             return res.status(400).json({ error: "At least two members are required for group splitting." });
//         }
//         splitResult = splitExpenseGroup(totalAmount, members);
//     } else {
//         return res.status(400).json({ error: "Invalid split type." });
//     }

//     // Optionally save the result in MongoDB
//     const newExpense = new Expense({
//         totalAmount,
//         members,
//         splitType,
//         splitResult,
//     });
//     await newExpense.save();

//     res.json(splitResult);
// });

// API route for fetching past splits
// app.get('/api/past-splits', async (req, res) => {
//     try {
//         const expenses = await Expense.find().sort({ createdAt: -1 });
//         res.json(expenses);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch past splits' });
//     }
// });

// API route to handle scanned data
// app.get('/details', (req, res) => {
//     const { billId, totalAmount, numberOfPeople } = req.query;

//     // Validate query parameters
//     if (!billId || !totalAmount || !numberOfPeople) {
//         return res.status(400).send('Missing required fields');
//     }

//     // Calculate per person share
//     const perPersonShare = (totalAmount / numberOfPeople).toFixed(2);

//     // Send response
//     res.send(`
//         <h1>Expense Details</h1>
//         <p>Bill ID: ${billId}</p>
//         <p>Total Amount: ${totalAmount}</p>
//         <p>Number of People: ${numberOfPeople}</p>
//         <p>Per Person Split: ${perPersonShare}</p>
//     `);
// });

// // Start server
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
