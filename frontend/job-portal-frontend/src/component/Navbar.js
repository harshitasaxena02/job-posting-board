// src/component/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    // Clear user authentication data (e.g., JWT tokens, user state)
    localStorage.removeItem('authToken'); // Example if using localStorage
    // You can also handle state clearing if you are using React state management
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
