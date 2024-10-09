import React, { useState } from 'react';
import axios from 'axios';
import './RoomsManagement.css';
import { MdOutlineAddBox } from "react-icons/md"; 
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineHotel } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import {   getToken  } from '../../savetoken.jsx'
import { Link, useNavigate } from 'react-router-dom'; // Reuse the same CSS file


const RoomsManagement = () => {

  const navigate = useNavigate();
  const [hotelId, setHotelId] = useState('');

  const HandleHotelView = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const result = await axios.get('http://localhost:3001/api/rooms', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!result || result.status === 400) {
        console.log("No rooms available");
        navigate('/error');
        return;
      }

      console.log(result.data);
      navigate('/hotelroom');
    } catch (error) {
      console.log("Error in server", error);
      navigate('/error');
    }
  };
  return (
    <div>
      <div className="main-title">
        <h1>Hotel Management System</h1>
      </div>
      <div className="rooms-container">
      <div className="features-grid">
      <Link to = "insert">
        <div className="feature-card">
          <div className="icon">
          <MdOutlineAddBox/>
          </div>
         
          <h2 className="feature-title">Insert Room</h2>
          <p className="feature-description">Add a new room to the hotel management system.</p>
        
        </div>
        </Link>
        <Link to = "delete">
        <div className="feature-card">
          <div className="icon">
          <RiDeleteBinLine />
          </div>
          <h2 className="feature-title">Delete Room</h2>
          <p className="feature-description">Remove an existing room from the list.</p>
        </div>
        </Link>
        {/* View Available Rooms */}
        <Link to = "view">
        <div className="feature-card">
          <div className="icon">
          <MdOutlineHotel />
          </div>
          <h2 className="feature-title">View Available Rooms</h2>
          <p className="feature-description">Check out the currently available rooms in the hotel.</p>
        </div>
        </Link>
        {/* Update Room */}
        <Link to = "update">
        <div className="feature-card">
          <div className="icon">
          <FaPen />
          </div>
          <h2 className="feature-title">Update a Room</h2>
          <p className="feature-description">Make changes to the details of a specific room.</p>
        </div>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default RoomsManagement;
