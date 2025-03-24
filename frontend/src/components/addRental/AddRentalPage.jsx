import React, { useEffect } from 'react';
import AddRentalForm from './AddRentalForm';
import { useParams } from 'react-router-dom';

function AddRentalPage() {
  const {_id} = useParams();
  const [rentalData, setRentalData] = React.useState(null);

  useEffect(() => {
    if (_id) {
      const fetchRentalData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/${_id}`);
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

  return (
    <div className="add-rental-page">
      <h1>Add New Rental</h1>
      <AddRentalForm rental={rentalData} />
    </div>
  );
}

export default AddRentalPage;
