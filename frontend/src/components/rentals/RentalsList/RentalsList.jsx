import React from 'react';
import PropTypes from 'prop-types';
import RentalItem from '../RentalItem/RentalItem';
import styles from './RentalsList.module.css';

function RentalsList({ rentals,onEdit,onDelete }) {
  return (
    <ul className={styles.rentalsList}>
      {rentals.map(rental => (
        <RentalItem key={rental._id} rental={rental} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </ul>
  );
}
RentalsList.propTypes = {
  rentals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RentalsList;
