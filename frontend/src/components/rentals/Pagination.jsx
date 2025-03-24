import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ rentalsPerPage, totalRentals, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRentals / rentalsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  rentalsPerPage: PropTypes.number.isRequired,
  totalRentals: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;