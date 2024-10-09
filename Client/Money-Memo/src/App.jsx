import Details from "./Component/Details";
import 'bootstrap/dist/css/bootstrap.min.css';
import PastSplits from "./Component/PastSplits";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import AuthForm from "./Component/AuthForm";
import SetBudget from "./Component/setBudget";
import ExpenseTracker from "./Component/ExpenseTracker";

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/auth" element={<AuthForm />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/past-splits" element={<PastSplits />} />
                    <Route path="/budget" element={<SetBudget />} />
                    <Route path='/tracker' element={<ExpenseTracker />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
