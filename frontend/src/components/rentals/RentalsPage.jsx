import React, { useState, useEffect } from 'react';
import RentalsList from './RentalsList/RentalsList';
import { useNavigate } from 'react-router-dom';
import FilterBar from './FilterBar/FilterBar';
import Pagination from './Pagination';

function RentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalsPerPage] = useState(10); 
  //const [filterCity, setFilterCity] = useState('');
  const [filteredRentals, setFilteredRentals] = useState([]);
  const navigate = useNavigate();
  
  //new state variable for filter
  const [filterCity, setFilterCity] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterAmenities, setFilterAmenities] = useState('');
  const [sortBy, setSortBy] = useState('');

  //load selectedRentals from localStorage
  const [selectedRentals, setSelectedRentals] = useState(() => {
    const saved = localStorage.getItem('selectedRentals');
    return saved ? JSON.parse(saved) : [];
  });

  //Edit 
  const onEdit =(_id) => {
    navigate(`/add-rental/${_id}`);
  };

  //delete 
  const onDelete = async (_id) => {
    const url = `/api/rentals/delete/${_id}`;
    console.log('Deleting rental at URL:', url);
    try {
      // Make a DELETE request to the API
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        // Refresh the rentals list
        setRentals(previousRentals => previousRentals.filter(rental => rental._id !== _id));
        // Update selected rentals in localStorage
        if (selectedRentals.includes(_id)) {
          const updatedSelectedRentals = selectedRentals.filter(rentalId => rentalId !== _id);
          setSelectedRentals(updatedSelectedRentals);
          localStorage.setItem('selectedRentals', JSON.stringify(updatedSelectedRentals));
        }
      } else {
        throw new Error(`Failed to delete rental: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete rental:', error);
    }
  };

  // comparison 
  const onToggleCompare = (_id) => {
    // Ensure the ID is a string
    const id = String(_id);
    let updatedSelectedRentals;

    if (selectedRentals.includes(id)) {
      updatedSelectedRentals = selectedRentals.filter(rentalId => rentalId !== id);
    }
    else {
      //check if out of 5 
      if (selectedRentals.length < 5) {
        // add to selectedRentals
        updatedSelectedRentals = [...selectedRentals, id];
      } else {
        alert('You can only compare up to 5 rentals at a time.');
        return;
      }
    }
    //
    setSelectedRentals(updatedSelectedRentals);
    localStorage.setItem('selectedRentals', JSON.stringify(updatedSelectedRentals));
  };

  // Fetch rentals when the component mounts
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch(`/api/rentals/list`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      }
      
    };

    fetchRentals();
  }, []);
  
  // Filter 
  useEffect(() => {
    // Start with all rentals 
    let filtered = rentals;

    // apply city filter if selected 
    if (filterCity) {
      filtered = filtered.filter(rental => rental.city === filterCity);
    }

    // apply country filter if selected
    if (filterCountry) {
      filtered = filtered.filter(rental => rental.country === filterCountry);
    }

    if (filterAmenities) {
      filtered = filtered.filter(rental => 
        rental.amenities && rental.amenities.includes(filterAmenities)
      );
    }

    // apply sorting if selected 
    if (sortBy){
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'sqft-asc':
          filtered.sort((a, b) => a.squareFeet - b.squareFeet);
          break;
        case 'sqft-desc':
          filtered.sort((a, b) => b.squareFeet - a.squareFeet);
          break;
        default:
          break;
      }
    }
    setFilteredRentals(filtered);
    setCurrentPage(1);
  }
  , [rentals, filterCity, filterCountry, filterAmenities, sortBy]);

  // Calculate indices for pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Get current rentals for the current page
  const currentRentals = filteredRentals.slice(
    (currentPage - 1) * rentalsPerPage,
    currentPage * rentalsPerPage
  );

  // extract unique values for filters 
  const uniqueCities = Array.isArray(rentals)
  ? [...new Set(rentals.map(rental => rental.city))]
  : [];

  const uniqueCountries = Array.isArray(rentals)
  ? [...new Set(rentals.map(rental => rental.country))]
  : [];

  const uniqueAmenities = Array.isArray(rentals)
  ? [...new Set(rentals.flatMap(rental => rental.amenities || []))]
  : [];

  //modify filter change handler to hadnle all filters
  const handleFilterChange = (type,value) => {
    switch (type) {
      case 'city':
        setFilterCity(value);
        break;
      case 'country':
        setFilterCountry(value);
        break;
      case 'amenities':
        setFilterAmenities(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="rentals-page">
      <FilterBar 
        cities = {uniqueCities} 
        countries = {uniqueCountries}
        amenities = {uniqueAmenities}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
      />
      {/*Notification about selected property*/ }
      {selectedRentals.length > 0 && (
        <div className="notification">
          <p>You have selected {selectedRentals.length} rental(s) for comparison.</p>
        </div>
      )}

      {/* Pass selected rentals to RentalsList */}
      <RentalsList 
        rentals={currentRentals} 
        onEdit={onEdit} 
        onDelete={onDelete}
        onToggleCompare={onToggleCompare}
        selectedRentals={selectedRentals}
      />
      
      {/* Pagination */}
      <Pagination 
        rentalsPerPage={rentalsPerPage} 
        totalRentals={filteredRentals.length} 
        paginate={paginate}
        currentPage={currentPage} 
        />
    </div>
  );
}

export default RentalsPage;
