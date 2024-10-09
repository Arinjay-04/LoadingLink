import React, {useState} from 'react';
import './GuestLogin.css'; // Reuse the same CSS file
import axios from 'axios'; 
import {Link, useNavigate } from 'react-router-dom';

const GuestSignup = ({ handleRegister }) => {
  const [firstname, setfName] = useState('');
  const [lastname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handlefNameChange = (e) => setfName(e.target.value);
  const handlelNameChange = (e) => setlName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSubmit = async(e) => {
    // handleRegister({ name, email, password, phone, address });
    e.preventDefault();
      try{
        const response = await axios.post('http://localhost:3001/api/guest/create', {
            firstname, lastname,  address, phone, email, password   
        })

        if(response.status === 400){
            console.log(response.data);
            return;
        }
        

        navigate('/guestlogin');
        console.log("success");


      }catch(error){
          return  console.log("Error:", error);
      }
  };

  return (
    <div className="container1">
      <div className="left-panel">
        <div className="logo">Hotel Management</div>
        <h1 className="title">Join the <span className="highlight">Hotel Premium Portal</span></h1>
        <p className="subtitle">Create an account to get started</p>
        <form className="signup-form">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="FirstName"
            value={firstname}
            onChange={handlefNameChange}
            required
          />
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="LastName"
            value={lastname}
            onChange={handlelNameChange}
            required
          />
          
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Email Id"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label className="form-label">Password</label>
          <input type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required />

          <label className="form-label">Phone number</label>
          <input  type="tel"
            className="form-input"
            placeholder="Phone no"
            value={phone}
            onChange={handlePhoneChange}
            required />

          <label className="form-label">Address</label>
          <input type="text"
            className="form-input"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            required />

          <button type="submit" className="signup-button" onClick={handleSubmit} >Create Account</button>
        </form>
        
        <p className="signup-text">
        <span className="highlight"> Already have an account?</span> < Link to = "/guestlogin " className='linkto'>Login here</Link>
        </p>
      </div>
      <div className="right-panel">
        <img
          src="https://www.cvent.com/sites/default/files/image/2020-09/Businesswoman%20with%20suitcase%20in%20hotel%20lobby.jpg"
          alt="Signup Illustration"
          className="image"
        />
      </div>
    </div>
  );
};

export default GuestSignup;