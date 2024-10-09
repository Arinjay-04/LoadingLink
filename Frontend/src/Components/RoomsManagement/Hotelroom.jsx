import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../savetoken';
import './HotelRoom.css';

function HotelRoom() {
  // Static room data for demonstration purposes
  const [rooms, setRooms] = useState([]);
  

  const HandleView = async (e) => {
    if (e) e.preventDefault(); 
    
    try {
      const token = getToken(); 
      const result = await axios.get('http://localhost:3001/api/rooms', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (result.status === 200) {
      
        setRooms(result.data);
      } else {
     
        console.log(`Unexpected status code: ${result.status}`);
      }
      
    } catch (error) {
    
      console.error("Error fetching room data", error);
    }
  };


  useEffect(() => {
    HandleView();
  }, []);


  return (
    <div className="container4">
    <div className="main-title4">
       <h1>Available Rooms</h1>
    </div>
    <div className="block-container4 grid4">
       {rooms.map((room) => (
          <div className="block4" key={room.id}>
             <h3>Room: {room.roomnumber}</h3>
             <p>Type: {room.type}</p>
             <p>Status: {room.status}</p>
             <p>Price: ₹{room.price}</p>
          </div>
       ))}
    </div>
 </div>
 
  );
}

export default HotelRoom;