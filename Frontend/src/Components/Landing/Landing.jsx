import React from 'react';
import './Landing.css'; 
import { Link } from 'react-router-dom';


export const Landing = () => {
  return (
    <div className="container">
      <div className="overlay">
        <div className="text-wrapper">
          <h1 className="header-top">Welcome to</h1>
          <h1 className="main-header">Hotel Management Portal</h1>
          <p className="description">Choose your login option below:</p>
          <div className="button-group">
         
              <button className="cta-button"><Link to="/guestlogin"> Login as Guest </Link></button>
            
              <button className="cta-button hotel-button"><Link to="/hotellogin"> Login as Hotel </Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};
