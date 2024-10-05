import React, { useState } from 'react';
import axios from 'axios';
import './HotelLogin.css'; 
import { saveToken } from '../../savetoken.jsx'
import { Link,  useNavigate } from 'react-router-dom';






const HotelLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/auth/login/hotel', {
            email,
            password
        });

        if (response.status === 400) {
            console.error('Error: ', response.data.message); // Log the error message
            return;
        }

        const token = response.data.token;
        if (token) {
            console.log('Token received:', token);
            saveToken(token); 
            navigate('/main');
            console.log("Login successful");
        } else {
            console.error('Token not found in response');
        }
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message); 
    }
  };
  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo">Hotel Management</div>
        <h1 className="title">Welcome to <span className="highlight">LoadingLink</span></h1>
        <p className="subtitle">Please log in to manage your bookings and services</p>
        <form className="login-form">
          <label className="form-label">Email ID</label>
          <input type="text" className="form-input" placeholder="Enter your Email ID" value={email}
            onChange={handleEmailChange} required />

          <label className="form-label">Password</label>
          <input type="password" className="form-input" placeholder="Enter your password" value={password}
            onChange={handlePasswordChange} required />

          <button type="submit"  className="login-button"  onClick={handleSubmit} >Login</button>
        </form>
        <p className="signup-text">
        <span className="highlight">New to the portal?</span> < Link to = "/hotelsignup " className='linkto'>Register your hotel here</Link>
        </p>
      </div>
      <div className="right-panel">
        <img
          src="https://www.kayak.co.in/news/wp-content/uploads/sites/76/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg"
          alt="Hotel Illustration"
          className="image"
        />
      </div>
    </div>
  );
};

export default HotelLogin;
