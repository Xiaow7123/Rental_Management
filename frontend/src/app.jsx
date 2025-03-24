import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/dashboard/DashboardPage';
import RentalsPage from './components/rentals/RentalsPage';
import AddRentalPage from './components/addRental/AddRentalPage';
import Sidebar from './components/common/Sidebar';
import AboutPage from './components/about/AboutPage';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/rentals" element={<RentalsPage />} />
        <Route path="/add-rental" element={<AddRentalPage />} />
        <Route path="/edit-rental/:_id" element={<AddRentalPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
