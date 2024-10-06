import Details from "./Component/Details";
import 'bootstrap/dist/css/bootstrap.min.css';
import PastSplits from "./Component/PastSplits";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use BrowserRouter and Routes in React Router v6
import BillSplitting from "./Component/BillSplitting";
import QRScanner from "./Component/QRScanner";

function App() {
  return (
   <div>
      <Router>
        <Routes>
          <Route path="/details" element={<Details />} />
          <Route path="/past-splits" element={<PastSplits />} />
          <Route path="/bill-split" element={<BillSplitting />} />
          <Route path="/qrscanner" element={<QRScanner />} />
        </Routes>
      </Router>
   </div>
  );
}

export default App;
