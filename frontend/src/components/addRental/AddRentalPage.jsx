import React, { useEffect } from 'react';
import AddRentalForm from './AddRentalForm';
import { useParams } from 'react-router-dom';

function AddRentalPage() {
  // Get the _id from the URL
  const {_id} = useParams();
  // Check the _id
  console.log("ID:", _id); 
  const [rentalData, setRentalData] = React.useState(null);

  // Fetch rental data if an _id is provided
  useEffect(() => {
    if (_id) {
      const fetchRentalData = async () => {
        try {
          console.log(`Fetching data from: api/rentals/${_id}`);

          const response = await fetch(`api/rentals/${_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Fetched Data:", data); // Check what is being fetched

          setRentalData(data);
        } catch (error) {
          console.error('Error fetching rental data:', error);
        }
      };
      fetchRentalData();
    }
  }, [_id]);
  
  console.log("Rental Data:", rentalData); // Check the rental data
  return (
    <div className="add-rental-page">
      <h1>Add New Rental</h1>
      <AddRentalForm rental={rentalData} />
    </div>
  );
}


export default AddRentalPage;
