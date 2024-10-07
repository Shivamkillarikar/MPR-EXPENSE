import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const LineChart = ({ userId }) => {  // Accept userId as a prop
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`/api/expense/user/${userId}`); // Use userId in API request
        const expenses = response.data;

        const labels = expenses.map(expense => new Date(expense.date).toLocaleDateString());
        const data = expenses.map(expense => expense.amount);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Expenses',
              data,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            }
          ]
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching expenses data.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId]); // Run effect when userId changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return chartData ? <Line data={chartData} /> : <p>No data available</p>;
};

export default LineChart;
