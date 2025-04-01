import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><NavLink to="/" exact activeClassName="active">Dashboard</NavLink></li>
        <li><NavLink to="/rentals" activeClassName="active">Rentals</NavLink></li>
        <li><NavLink to="/add-rental" activeClassName="active">Add a Rental</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
