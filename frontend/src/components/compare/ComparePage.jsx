import React, { useState, useEffect } from 'react';
import './ComparePage.css';

function ComparePage(){
    const [comparisonRentals, setComparisonRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComparisonRentals = async () => {
            try {
                // Get the IDs from localStorage
                const comparisonIds = JSON.parse(localStorage.getItem('selectedRentals')||'[]');
                console.log('Comparison IDs:', comparisonIds);
                if (comparisonIds.length === 0) {
                    setComparisonRentals([]);
                    setLoading(false);
                    return;
                }

                // Fetch details of each rental 
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                const response = await fetch(`/api/rentals/compare?ids=${comparisonIds.join(',')}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                }       
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch rental data');
                }
                const data = await response.json();
                console.log('API response:', data);

                //Handle diffrenr response structure
                const rentals = data.data;;
                setComparisonRentals(rentals);
            } catch (error) {
                console.error('Error fetching rental data:', error);
                setError('Failed to load rental data');
            } finally {
                setLoading(false);
            }            
        };
        fetchComparisonRentals();  
    }
    , []);

        const removeFromComparison = (rentalId) => {
            //get current comparison list
            const currentList = JSON.parse(localStorage.getItem('selectedRentals') || '[]');
            // remove the rental 
            const updatedList = currentList.filter(id => id !== rentalId);
            // update localStorage
            localStorage.setItem('selectedRentals', JSON.stringify(updatedList));
            // Update state
            setComparisonRentals(prev =>
                prev.filter(rental => rental._id !== rentalId)
              );
                      };

        const clearComparison = () => {
            //clear the comparison list 
            localStorage.removeItem('selectedRentals');
            setComparisonRentals([]);
        };

        if (loading) return <div className="loading">Loading...</div>;
        if (error) return <div className="error-message">{error}</div>;
        if (comparisonRentals.length === 0) {
            return (
            <div className="no-comparison">
                <h2>No Rentals to Compare</h2>
                <p>Add properties to your comparison list from the rentals page.</p>
            </div>
        );
        }

        return (
            <div className="compare-container">
                <div className="compare-header">
                    <h1>Compare Rentals</h1>
                    <button className="clear-comparison" onClick={clearComparison}>Clear Comparison             
                    </button>
                </div>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th className ="feature-column">Feature</th>
                                {comparisonRentals.map((rental,index) => (
                                    <th key={rental._id} className="rental-column">
                                        <div className="property-header">
                                            <h3>{rental.name || `Compare ${index + 1}`}</h3>
                                        <button
                                                onClick={() => removeFromComparison(rental._id)}
                                                className="remove-rental"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="feature-column">Name</td>
                                {comparisonRentals.map(rental => (
                                    <td key={rental._id} >${rental.name}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="feature-column">Price</td>
                                {comparisonRentals.map(rental => (
                                    <td key={rental._id} >${rental.price}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="feature-column">Square Feet</td>
                                {comparisonRentals.map(rental => (
                                    <td key={rental._id} >{rental.squareFeet}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className ="feature-column">Amenity</td>
                                {comparisonRentals.map(rental => (
                                    <td key={rental._id} >
                                        {rental.amenities ? (
                                            <ul className="amenity-list">
                                                {rental.amenities.split(',').map((amenity, index) => (
                                                    <li key={index}>{amenity.trim()}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                ))}
                            </tr>
                            {/*Add more property features as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}
export default ComparePage;
