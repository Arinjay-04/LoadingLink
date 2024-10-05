import React from 'react';
import './RoomsManagement.css';
import { MdOutlineAddBox } from "react-icons/md"; 
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineHotel } from "react-icons/md";
import { FaPen } from "react-icons/fa6";

const RoomsManagement = () => {
  return (
    <div>
      <div className="main-title">
        <h1>Hotel Management System</h1>
      </div>
      <div className="rooms-container">
      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">
          <MdOutlineAddBox/>
          </div>
          <h2 className="feature-title">Insert Room</h2>
          <p className="feature-description">Add a new room to the hotel management system.</p>
        </div>
        <div className="feature-card">
          <div className="icon">
          <RiDeleteBinLine />
          </div>
          <h2 className="feature-title">Delete Room</h2>
          <p className="feature-description">Remove an existing room from the list.</p>
        </div>

        {/* View Available Rooms */}
        <div className="feature-card">
          <div className="icon">
          <MdOutlineHotel />
          </div>
          <h2 className="feature-title">View Available Rooms</h2>
          <p className="feature-description">Check out the currently available rooms in the hotel.</p>
        </div>

        {/* Update Room */}
        <div className="feature-card">
          <div className="icon">
          <FaPen />
          </div>
          <h2 className="feature-title">Update a Room</h2>
          <p className="feature-description">Make changes to the details of a specific room.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RoomsManagement;
