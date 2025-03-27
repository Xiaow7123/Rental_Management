import React from 'react';

import { useState, useEffect } from 'react';

function RentalSummary() {
  const [totalRentals, setTotalRentals] = useState(0);

  useEffect(() => {
    async function fetchRentalData() {
      try {
        const response = await fetch(`/api/rentals/total`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } 
        const data = await response.json();
        setTotalRentals(data.totalRentals); 
      } catch (error) {
        console.error('Error fetching rental data:', error);
      }
    }

    fetchRentalData();
  }, []);

  return (
    <div className="rental-summary">
      <h2>You&apos;re managing {totalRentals} rentals</h2>
    </div>
  );
}

export default RentalSummary;