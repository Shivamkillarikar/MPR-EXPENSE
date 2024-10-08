import Details from "./Component/Details";
import 'bootstrap/dist/css/bootstrap.min.css';
import PastSplits from "./Component/PastSplits";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Register from "./Component/Register";
import AuthForm from "./Component/AuthForm";
import SetBudget from "./Component/setBudget";
import { useState, useEffect } from "react";
import BudgetForm from './Component/BudgetForm';
import MonthlyBalance from './Component/MonthlyBalance';
import ExpenseForm from './Component/ExpenseForm';
import axios from 'axios';
import ExpenseTracker from "./Component/ExpenseTracker";

function App() {
    const [budget, setBudget] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const email = 'sh@gmail.com'; // Replace with the actual user email
    // Fetch existing budget when the app loads
    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/budget/${email}`);
                setBudget(response.data);
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };
        fetchBudget();
    }, [email]);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/auth" element={<AuthForm />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/past-splits" element={<PastSplits />} />
                    <Route path="/budget" element={<SetBudget />} />
                    <Route path="/" element={<BudgetForm setBudget={setBudget} email={email} />} />
                    <Route path="/add-expense" element={<ExpenseForm email={email} setExpenses={setExpenses} />} />
                    <Route path="/balance" element={<MonthlyBalance budget={budget} expenses={expenses} />} />
                    <Route path='/tracker' element={<ExpenseTracker />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
