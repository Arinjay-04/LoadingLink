import React, { useState } from 'react';
import axios from 'axios';
import './HotelLogin.css'; 
import { saveToken } from '../../savetoken.jsx'
import {Link, useNavigate } from 'react-router-dom'; // Reuse the same CSS file


const HotelSignup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSubmit = async(e) => {
    // handleRegister({ name, email, password, phone, address });
    e.preventDefault();
      try{
        const response = await axios.post('http://localhost:3001/api/hotels/create', {
            name, address, phone, email, password   
        })

        if(response.status === 400){
            console.log(response.data);
            return;
        }
        
        const token = response.data.token;
        saveToken(token);
        navigate('/main');
        console.log("success");


      }catch(error){
          return  console.log("Error:", error);
      }
  };
  return (
    <div className="container1">
      <div className="left-panel1">
        <div className="logo">Hotel Management</div>
        <h1 className="title">Join the <span className="highlight">Hotel Premium Portal</span></h1>
        <p className="subtitle">Create an account to get started</p>
        <form className="signup-form">
          <label className="form-label">Hotel Name</label>
          <input type="text" className="form-input" placeholder="Enter your hotel name" value={name}
            onChange={handleNameChange} required />
        

          <label className="form-label">Email</label>
          <input type="email" className="form-input" placeholder="Enter your email" value={email}
            onChange={handleEmailChange} required />

          <label className="form-label">Password</label>
          <input type="password" className="form-input" placeholder="Create a password"  value={password}
            onChange={handlePasswordChange} required />
          
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-input" 
            placeholder="Phone no"
            value={phone}
            onChange={handlePhoneChange}
            required
          />

          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-input" 
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            required
          />

          <button type="submit" className="signup-button1" onClick={handleSubmit}>Create Account</button>
        </form>
        
        <p className="signup-text">
          Login here
        </p>
        <p className="signup-text">
        <span className="highlight"> Already have an account?</span> < Link to = "/hotellogin " className='linkto'>Login here</Link>
        </p>
      </div>
      <div className="right-panel1">
        <img
          src="https://www.kayak.co.in/news/wp-content/uploads/sites/76/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg"
          alt="Signup Illustration"
          className="image1"
        />
      </div>
    </div>
  );
};

export default HotelSignup;
