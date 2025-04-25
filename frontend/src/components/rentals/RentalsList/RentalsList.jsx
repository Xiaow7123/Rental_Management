import React from 'react';
import PropTypes from 'prop-types';
import RentalItem from '../RentalItem/RentalItem';
import styles from './RentalsList.module.css';

function RentalsList({ rentals, onEdit, onDelete, onToggleCompare, selectedRentals }) {
  if (!rentals.length) {
    return <p className={styles.empty}>No rentals found</p>;
  }

  return (
    <div className={styles.gridContainer}>
      {rentals.map(rental => (
        <RentalItem
          key={rental._id}
          rental={rental}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompare={onToggleCompare}
          selectedRentals={selectedRentals}
        />
      ))}
    </div>
  );
}

RentalsList.propTypes = {
  rentals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompare: PropTypes.func.isRequired,
  selectedRentals: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default RentalsList;
