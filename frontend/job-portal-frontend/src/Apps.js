// src/Apps.js

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Register from './component/Register';

function Apps() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default Apps;
