import React from 'react';
import PropTypes from 'prop-types';
import styles from './RentalItem.module.css';

function RentalItem({ rental, onEdit, onDelete, onToggleCompare, selectedRentals }) {
  const price = parseFloat(rental.price);
  const formattedPrice = !isNaN(price) ? `$${price.toFixed(2)}` : 'Unavailable';
  const amenities = Array.isArray(rental.amenities) ? rental.amenities.join(', ') : 'None';
  const isSelected = selectedRentals?.includes(rental._id);

  return (
    <div className={styles.rentalItem}>
      <div className={styles.title}>{rental.name || 'Unnamed Property'}</div>
      <div className={styles.detailRow}><span className={styles.highlight}>Location:</span> {rental.city}, {rental.country}</div>
      <div className={styles.detailRow}><span className={styles.highlight}>Price:</span> {formattedPrice}</div>
      <div className={styles.detailRow}><span className={styles.highlight}>Square Feet:</span> {rental.squareFeet}</div>
      <div className={styles.detailRow}><span className={styles.highlight}>Amenities:</span> {amenities}</div>

      <div className={styles.actions}>
        <button className={styles.button} onClick={() => onEdit(rental._id)}>Edit</button>
        <button className={styles.button} onClick={() => onDelete(rental._id)}>Delete</button>
        <button
          className={`${styles.button} ${isSelected ? styles.selected : ''}`}
          onClick={() => onToggleCompare(rental._id)}
        >
          {isSelected ? 'Selected' : 'Compare'}
        </button>
      </div>
    </div>
  );
}

RentalItem.propTypes = {
  rental: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    price: PropTypes.number,
    squareFeet: PropTypes.number,
    amenities: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompare: PropTypes.func.isRequired,
  selectedRentals: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default RentalItem;
