import React, { useState, useEffect } from 'react';
import RentalsList from './RentalsList';
import { useNavigate } from 'react-router-dom';
import FilterBar from './FilterBar';
import Pagination from './Pagination';

function RentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalsPerPage] = useState(10); 
  const [filterCity, setFilterCity] = useState('');
  const [filteredRentals, setFilteredRentals] = useState([]);
  const navigate = useNavigate();

  const onEdit =(_id) => {
    navigate(`/add-rental/${_id}`);
  };

  const onDelete = async (_id) => {
    const url = `/api/rentals/delete/${_id}`;
    console.log('Deleting rental at URL:', url);
    try {
      // Make a DELETE request to the API
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Refresh the rentals list
        setRentals(previousRentals => previousRentals.filter(rental => rental._id !== _id));
      } else {
        throw new Error(`Failed to delete rental: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete rental:', error);
    }
  };

  useEffect(() => {

    // Fetch the rental data from an API or local data source
    const fetchRentals = async () => {
      try {
        const response = await fetch(`/api/rentals/list`);
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      }
      
    };

    fetchRentals();
  }, []);

  useEffect(() => {
    const filtered = filterCity
      ? rentals.filter(rental => rental.city === filterCity)
      : rentals;
    setFilteredRentals(filtered);
    setCurrentPage(1);
  }, [rentals,filterCity]);

  // Calculate indices for pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const currentRentals = filteredRentals.slice(
    (currentPage - 1) * rentalsPerPage,
    currentPage * rentalsPerPage
  );

  const uniqueCities = [...new Set(rentals.map(rental => rental.city))];

  return (
    <div className="rentals-page">
      <FilterBar cities = {uniqueCities} onFilterChange={setFilterCity}/>
      <RentalsList rentals={currentRentals} onEdit={onEdit} onDelete={onDelete} />
      <Pagination 
        rentalsPerPage={rentalsPerPage} 
        totalRentals={rentals.length} 
        paginate={paginate} />
    </div>
  );
}

export default RentalsPage;
