import React, { useState } from 'react';
import './update.css'; 
import axios from 'axios';
import { getToken } from '../../savetoken';
import { useNavigate } from 'react-router-dom';


const Update = () => {
    const [roomId, setRoomId] = useState('');
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate(); 
  
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        const token = getToken(); 
        const result = await axios.put('http://localhost:3001/api/rooms/update',
          {
            roomnumber: roomId,
            type: roomType,
            status: status,
            price: price
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        if (result.status === 400) {
          console.log("Room cannot be Updated");
          return;
        }
  
        console.log(result.data);
        navigate('/main');
  
      } catch (error) {
        console.log("Error in server", error);
      }
    };
  return (
    <div className="form-container">
      <h1 className="form-title">Update the Room</h1>
      <form className="room-form">
        <div className="form-group">
          <label htmlFor="roomId" className="form-label">Room ID:</label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            placeholder='Enter Room ID'
            onChange={(e) => setRoomId(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomType" className="form-label">Room Type:</label>
          <select
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Family">Family</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="roomType" className="form-label">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select Room Status</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            placeholder='Enter Price'
            onChange={(e) => setPrice(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button"  onClick={handleUpdate}>
          Update Room 
        </button>
      </form>
    </div>
  );
};

export default Update;