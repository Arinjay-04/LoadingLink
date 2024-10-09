import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../../savetoken';
import { useNavigate } from 'react-router-dom';
import './HotelRoom.css';

function HotelRoom() {
  // Static room data for demonstration purposes
  const [rooms, setRooms] = useState([]);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const ReserveRoom = async (roomnumber) => {
    const token = getToken();
    try {
      const result = await axios.post('http://localhost:3001/api/reservations/create', {
        roomnumber: roomnumber,
        hotelId: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

     setTimeout(() => {
      navigate('/mainguest')
     }, 3000)

     navigate('/reservedsuccess');
      
    } catch (error) {
      console.log("Error in Reserving room", error);
    }
  }

  const handleRoom = async () => {
    try {
      const token = getToken();
      const result = await axios.get(`http://localhost:3001/api/rooms/guest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Hello");
      console.log(result.data);
      setRooms(result.data);
    } catch (error) {
      console.log("Error in server", error);
    }
  };

  useEffect(() => {
    handleRoom();
  }, [id]);
  return (
    <div className="container4">
    <div className="main-title4">
      <h1>Available Rooms</h1>
      </div>
      <div className="block-container4 grid4">
      <ul>
        {rooms.map((room) => (
            <div className="block4" key={room.id}>
          <li key={room.id}>
            <h3>Room: {room.roomnumber}</h3>
            <p>Type: {room.type}</p>
            <p>Status: {room.status}</p>
            <p>Price: ₹{room.price}</p>
            <button className='block5' onClick={() => ReserveRoom(room.roomnumber)}>Reserve Room</button>
          </li>
          </div>
        ))}
      </ul>
      </div>
      
    </div>
  );
}

export default HotelRoom;