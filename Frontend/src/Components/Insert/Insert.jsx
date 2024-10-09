import React, { useState } from 'react';
import './Insert.css';
import axios  from 'axios';
import {   getToken  } from '../../savetoken.jsx'
import { useNavigate } from 'react-router-dom';


const Insert = () => {
  const [roomId, setRoomId] = useState('');
  const [roomType, setRoomType] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate('');
  const HandleInsert = async (e) => {
    e.preventDefault();
  
    try {
      const token = getToken(); 
      const result = await axios.post('http://localhost:3001/api/rooms/insert',
        {
          roomnumber: roomId,
          type: roomType,
          price: price
        },
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });
  
      if (result.status === 400) {
        console.log("Room cannot be inserted");
        return;
      }
      
     
      
      console.log(result.data);
      navigate('/main');
  
    } catch (error) {
      console.log("Error in server", error);
      if(error.response.status === 401){
        setTimeout(() => {
          navigate("/error");
        }, 1500)
        alert("Please Login first");
        
        return;
      }
      else if(error.response.status === 400){
        alert("Room cannot be inserted");
        return;
      }
      else if(error.response.status === 500){
        alert("Please enter valid inputs")
        return;
      }
    }
  };  
  return (
    <div className="form-container">
  
      
      <h1 className="form-title">Insert New Room</h1>
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

        <button type="submit" className="submit-button"  onClick={HandleInsert}>
          Insert Room
        </button>
      </form>
    </div>
  );
};

export default Insert;
