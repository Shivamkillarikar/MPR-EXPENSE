import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';


const Details = () => {
  const [formData, setFormData] = useState({
    totalAmount: '',
    splitType: 'group', 
    members: ['', ''], 
  });

  const [perPersonSplit, setPerPersonSplit] = useState(0);  
  const navigate = useNavigate(); 

  useEffect(() => {
    if (formData.totalAmount && formData.members.length > 0) {
      const amount = parseFloat(formData.totalAmount);
      const numMembers = formData.members.length;
      setPerPersonSplit((amount / numMembers).toFixed(2)); // Calculate the split
    } else {
      setPerPersonSplit(0);
    }
  }, [formData.totalAmount, formData.members]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'members') {
      const updatedMembers = [...formData.members];
      updatedMembers[index] = value;
      setFormData({ ...formData, members: updatedMembers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddMember = () => {
    setFormData({ ...formData, members: [...formData.members, ''] });
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...formData.members];
    if (updatedMembers.length > 2) {
      updatedMembers.splice(index, 1);
      setFormData({ ...formData, members: updatedMembers });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to backend
      await axios.post('http://localhost:5000/api/split', formData);
      alert('Split Saved!');
      navigate('/past-splits');
    } catch (error) {
      console.error('Error saving split:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[#AFEEEE]">
        <div className="bg-[#66CDAA] shadow-lg rounded-xl p-12 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter total amount"
                required
              />
            </div>

            <div className="flex justify-between">
              <label className="block text-gray-700 font-medium">Split Type:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="splitType"
                    value="group"
                    checked={formData.splitType === 'group'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Group
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="splitType"
                    value="pair"
                    checked={formData.splitType === 'pair'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Pair
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Members</label>
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <input
                    type="text"
                    name="members"
                    value={member}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder={`Enter member ${index + 1}`}
                    required
                  />
                  {formData.members.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={handleAddMember}
                className="text-teal-500 hover:text-teal-700 font-medium"
                disabled={formData.splitType === "pair"}
              >
                + Add Member
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-teal-600">Per Person Split: ₹ {perPersonSplit}</h3>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                disabled={formData.members.length<4 && formData.splitType==="group"}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
