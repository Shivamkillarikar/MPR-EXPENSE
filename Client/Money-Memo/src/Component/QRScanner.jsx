import  { useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';

const QRScanner = () => {
  const [billId, setBillId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [qrData, setQrData] = useState(null);
  const [splitResult, setSplitResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount && numberOfPeople) {
      const data = {
        billId: billId || `BILL-${Math.floor(Math.random() * 10000)}`,
        totalAmount: parseFloat(totalAmount),
        numberOfPeople: parseInt(numberOfPeople, 10),
      };
      setQrData(JSON.stringify(data)); // Generate QR code data
    }
  };

  // Function to handle the QR code scan
  const handleScan = async (data) => {
    if (data) {
      const parsedData = JSON.parse(data);
      const response = await axios.post('http://localhost:5000/api/split', {
        totalAmount: parsedData.totalAmount,
        members: Array(parsedData.numberOfPeople).fill(parsedData.billId), // Simulating members
        splitType: 'group', // Can be 'pair' or 'group'
      });

      // Set split result if needed
      setSplitResult(response.data);
      // Redirect to the '/api/split' endpoint or show result directly
      window.location.href = 'http://localhost:5000/details?' +
        new URLSearchParams({
          billId: parsedData.billId,
          totalAmount: parsedData.totalAmount,
          numberOfPeople: parsedData.numberOfPeople,
        });
    }
  };

  return (
    <div>
      <h2>Enter Bill Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bill ID:
          <input
            type="text"
            value={billId}
            onChange={(e) => setBillId(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <br />
        <label>
          Total Amount:
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Number of People:
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Generate QR Code</button>
      </form>

      {qrData && (
        <div>
          <h3>Scan this QR Code:</h3>
          <QRCode value={qrData} size={200} />
        </div>
      )}

      {/* Simulate QR Code Scanner */}
      <div>
        <h3>Simulated QR Code Scanner</h3>
        <button onClick={() => handleScan(qrData)}>Simulate Scan</button>
      </div>

      {splitResult && (
        <div>
          <h3>Split Result:</h3>
          <pre>{JSON.stringify(splitResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
