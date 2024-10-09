import React from 'react';
import { Landing } from './Components/Landing/Landing';
import HotelLogin from './Components/HotelLogin/HotelLogin';
import HotelSignup from './Components/HotelLogin/HotelSignup';
import GuestLogin from './Components/Guest/Guestlogin.jsx'
import GuestSignup from './Components/Guest/Guestsignup.jsx'
import RoomsManagement from './Components/RoomsManagement/RoomsManagement';
import Insert from './Components/Insert/Insert';
import Delete from "./Components/Delete/Delete.jsx"
import Update from "./Components/update/update.jsx"
import Room from "./Components/RoomsManagement/GuestRoom.jsx"
import View from "./Components/RoomsManagement/Hotelroom.jsx"
import Mainguest from "./Components/RoomsManagement/MainGuest.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hotellogin" element={<HotelLogin />} />
        <Route path="/hotelsignup" element={<HotelSignup />} />
        <Route path="/guestlogin" element={<GuestLogin />} />
        <Route path="/guestsignup" element={<GuestSignup/>} />
        <Route path="/main" element={<RoomsManagement />} />
        <Route path="/mainguest" element={<Mainguest />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/main/insert" element={<Insert/>} />
        <Route path="/main/delete" element={<Delete/>} />
        <Route path="/main/update" element={<Update/>} />
        <Route path="/main/view" element={<View/>} />
        {/* Uncomment and add your additional routes as needed
        <Route path='/guestlogin' element={<div className="guest-background full-screen"><GuestLogin/></div>}/>
        <Route path="/guestsignup" element={<div className="guest-background full-screen"><GuestSignup /></div>} />
        <Route path="/delete" element={<Delete/>} />
        */}
      </Routes>
    </Router>
  );
};

export default App;
