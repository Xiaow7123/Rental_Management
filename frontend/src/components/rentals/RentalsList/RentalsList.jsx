import React from 'react';
import PropTypes from 'prop-types';
import RentalItem from '../RentalItem/RentalItem';
import styles from './RentalsList.module.css';

function RentalsList({ rentals,onEdit,onDelete }) {
  if (!rentals.length) {
    return <p className={styles.empty}>No rentals found</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>  
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Address</th>
          <th className={styles.th}>Price</th>
          <th className={styles.th}>Square Feet</th>
          <th className={styles.th}>Amentities</th>
          <th className={styles.th}>Action</th>
        </tr>
      </thead>
      <tbody>
        {rentals.map(rental => (
          <RentalItem key={rental._id} rental={rental} onEdit={onEdit} onDelete={onDelete}/>
        ))}
      </tbody>
    </table>
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
