import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import RentalsPage from './components/rentals/RentalsPage';
import AddRentalPage from './components/addRental/AddRentalPage';
import Navbar from './components/common/Navbar/Navbar';
import AboutPage from './components/about/AboutPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ComparePage from  './components/compare/ComparePage';
import './app.css';
import PropTypes from 'prop-types';


// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);

  useEffect(() => {
    //check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsAuthChecked(true);
  }
  , []);

  if (!isAuthChecked) {
    return null; 
  }

  return (
    <Router>
       {isAuthenticated && <Navbar />}
       <div className={isAuthenticated ? "app" : "app full-width"}>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={
            isAuthenticated
            ? <Navigate to="/rentals" replace />
            : <Navigate to="/login" replace />
            } />
          
          {/* Login in */}
          <Route path="/login" element={
            isAuthenticated 
            ? <Navigate to="/rentals" replace /> 
            : <Login setIsAuthenticated={setIsAuthenticated} />
          } />

          <Route path="/register" element={
            isAuthenticated 
            ? <Navigate to="/" replace /> 
            : <Register />
          } />

          <Route path="/rentals" element={
            <ProtectedRoute>
              <RentalsPage />
            </ProtectedRoute>
          } />
          <Route path="/add-rental/:_id?" element={
            <ProtectedRoute>
              <AddRentalPage />
            </ProtectedRoute>
          } />
          <Route path="/compare" element={
            <ProtectedRoute>
              <ComparePage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          } />

          {/* Redirect to login if no matching route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
