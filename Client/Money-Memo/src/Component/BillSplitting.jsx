import { useState } from 'react';
// import QRCode from 'qrcode.react';
import axios from 'axios';

const BillSplitting = () => {
  const [totalAmount, setTotalAmount] = useState('');
  const [members, setMembers] = useState([{ name: '', amount: 0 }]);
  const [qrCodeData, setQrCodeData] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const handleAddMember = () => {
    setMembers([...members, { name: '', amount: 0 }]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSplit = async () => {
    const perPerson = totalAmount / members.length;
    const updatedMembers = members.map((member) => ({ ...member, amount: perPerson }));
    setMembers(updatedMembers);

    // Generate QR Code data (You can also include more information)
    const qrData = {
      totalAmount,
      members: updatedMembers,
    };
    setQrCodeData(JSON.stringify(qrData));

    // Generate payment link (if needed, for now just an example)
    const { data } = await axios.post('/api/create-payment-intent', {
      amount: totalAmount,
      currency: 'usd',
    });
    setPaymentLink(data.clientSecret); // Or actual payment URL depending on payment gateway
  };

  return (
    <div className="bill-splitting">
      <h2>Bill Splitting</h2>
      <input
        type="number"
        placeholder="Total Amount"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
      />

      {members.map((member, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Member Name"
            value={member.name}
            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
          />
          <button onClick={() => handleRemoveMember(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddMember}>Add Member</button>
      <button onClick={handleSplit}>Split Bill</button>

      <div className="qr-code-section">
        {qrCodeData && <QRCode value={qrCodeData} size={200} />}
        {paymentLink && <p>Payment Link: {paymentLink}</p>}
      </div>
    </div>
  );
};

export default BillSplitting;
