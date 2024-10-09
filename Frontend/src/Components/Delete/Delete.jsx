
import React, { useState } from 'react';
import './Delete.css'; 
import axios from 'axios';
import { getToken } from '../../savetoken';
import { useNavigate } from 'react-router-dom';;


const Delete = () => {
    const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = getToken(); 

      // Assuming room ID should be sent as a query parameter
      const result = await axios.post(`http://localhost:3001/api/rooms/delete`, {
        roomnumber: roomId
      },{
        headers: {
          Authorization: `Bearer ${token}`
        },
       
         
      });

      if (result.status === 200) {
        console.log("Room deleted successfully");
        navigate('/main');
      } else {
        console.log("Error: Unable to delete room");
      }

    } catch (error) {
      console.log("Error in deleting room:", error);
    }
  };
  return (
    <div className="form-container">
      <h1 className="form-title">Delete New Room</h1>
      <form className="room-form">
        <div className="form-group">
          <label htmlFor="roomId" className="form-label">Room ID:</label>
          <input
            type="text"
            id="roomId"
            placeholder='Enter Room ID'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button" onClick={handleDelete}>
          Delete Room
        </button>
      </form>
    </div>
  );
};

export default Delete;
