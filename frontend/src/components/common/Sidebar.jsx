import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink></li>
        <li><NavLink to="/rentals" className={({ isActive }) => isActive ? 'active' : undefined}>Rentals</NavLink></li>
        <li><NavLink to="/add-rental" className={({ isActive }) => isActive ? 'active' : undefined}>Add a Rental</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
