import React from 'react';
import PropTypes from 'prop-types';
import styles from './RentalItem.module.css';

function RentalItem({ rental, onEdit,onDelete }) {
  const price = parseFloat(rental.price);  // Convert price to a float
  const formattedPrice = !isNaN(price) ? `$${price.toFixed(2)}` : 'Unavailable';
  const amenities = Array.isArray(rental.amenities) ? rental.amenities.join(', ') : 'None';


return (
  <tr className={styles.rentalItem}>
      <td>{rental.name}</td>
      <td>{rental.city}, {rental.country}</td>
      <td>{formattedPrice}</td>
      <td>{rental.squareFeet}</td>
      <td>{amenities}</td>
      <td>
        <button onClick={() => onEdit(rental._id)}>Edit</button>
        <button onClick={() => onDelete(rental._id)}>Delete</button>
      </td>
  </tr>
);

}
RentalItem.propTypes = {
  rental: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    squareFeet: PropTypes.number.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
// Removed duplicate export statement
export default RentalItem;

