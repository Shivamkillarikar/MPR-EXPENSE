import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';


const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Check if passwords match before registering
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        // Register user
        await axios.post('http://localhost:5000/api/register', formData);
        alert('Registration Successful!');
      } else {
        // Login user
        await axios.post('http://localhost:5000/api/login', { 
          email: formData.email, 
          password: formData.password 
        });
        
        // Set user email in context after successful login
        alert('Login Successful!');
      }
      // Navigate to budget page after successful auth
      navigate('/budget'); 
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication failed!'); // Display error to user
    }
  };

  const toggleForm = () => {
    // Toggle between Register and Login forms
    setIsRegister(!isRegister);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[#AFEEEE]">
        <div className="bg-[#66CDAA] shadow-lg rounded-xl p-12 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
            {isRegister ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your name"
                  required={isRegister}
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {isRegister && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Confirm your password"
                  required={isRegister}
                />
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
              >
                {isRegister ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={toggleForm}
              className="text-teal-500 hover:text-teal-700 font-medium"
            >
              {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
