import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedRentals');
    navigate('/login');
  };


  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/rentals" className={({ isActive }) => isActive ? 'active' : undefined}>Rentals</NavLink>
        <NavLink to="/add-rental" className={({ isActive }) => isActive ? 'active' : undefined}>Add a Rental</NavLink>
        <NavLink to="/compare" className={({ isActive }) => isActive ? 'active' : undefined}>Compare</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
      </div>
      
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </nav>
  );
}

export default Navbar;
