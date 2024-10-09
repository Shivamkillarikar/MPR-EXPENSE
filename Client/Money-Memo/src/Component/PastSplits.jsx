import  { useState, useEffect } from 'react';
import axios from 'axios';

const PastSplits = () => {
  const [pastSplits, setPastSplits] = useState([]);

  useEffect(() => {
    // Fetch past splits when the component is mounted
    const fetchPastSplits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/past-splits');
        setPastSplits(response.data);
      } catch (error) {
        console.error('Error fetching past splits:', error);
      }
    };

    fetchPastSplits();
  }, []);

  // Filter splits by type
  const groupSplits = pastSplits.filter(split => split.splitType === 'group');
  const pairSplits = pastSplits.filter(split => split.splitType === 'pair');

  return (
    <div className="p-4">
        <div className=''>
      <h2 className="text-white text-2xl mb-4 text-center font-semibold">Past Splits</h2>
      </div>

      {/* Group Splits Section */}
      <div>
        <h3 className="text-white text-xl mb-4">Group Splits</h3>
        {groupSplits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {groupSplits.map((split, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">Amount: {split.totalAmount}</h3>
                <p><strong>Date:</strong> {new Date(split.createdAt).toLocaleString()}</p>
                <p><strong>Members:</strong> {split.members.join(', ')}</p>
                <ul>
                  {split.splitResult.map((result, idx) => (
                    <li key={idx}>
                      {result.member}: {result.share}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No group splits found</p>
        )}
      </div>

      {/* Pair Splits Section */}
      <div>
        <h3 className="text-white text-xl mb-4">Pair Splits</h3>
        {pairSplits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pairSplits.map((split, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">Amount: {split.totalAmount}</h3>
                <p><strong>Date:</strong> {new Date(split.createdAt).toLocaleString()}</p>
                <p><strong>Members:</strong> {split.members.join(', ')}</p>
                <ul>
                  {split.splitResult.map((result, idx) => (
                    <li key={idx}>
                      {result.member}: {result.share}
                    </li>
                  ))}
                </ul>
                
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No pair splits found</p>
        )}
      </div>
    </div>
  );
};

export default PastSplits;
