import React from 'react';
import './Insert.css';


const Insert = () => {
  return (
    <div className="form-container">
  
      
      <h1 className="form-title">Insert New Room</h1>
      <form className="room-form">
        <div className="form-group">
          <label htmlFor="roomId" className="form-label">Room ID:</label>
          <input
            type="text"
            id="roomId"
            placeholder="Enter Room ID"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomType" className="form-label">Room Type:</label>
          <select
            id="roomType"
            required
            className="form-input"
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Family">Family</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Insert Room
        </button>
      </form>
    </div>
  );
};

export default Insert;
