import React from 'react';
import { Landing } from './Components/Landing/Landing';
import HotelLogin from './Components/HotelLogin/HotelLogin';
import HotelSignup from './Components/HotelLogin/HotelSignup';
import RoomsManagement from './Components/RoomsManagement/RoomsManagement';
import Insert from './Components/Insert/Insert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hotellogin" element={<HotelLogin />} />
        <Route path="/hotelsignup" element={<HotelSignup />} />
        <Route path="/main" element={<RoomsManagement />} />
        <Route path="/insert" element={<Insert />} />
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
