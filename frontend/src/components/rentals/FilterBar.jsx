import React from 'react';
import PropTypes from 'prop-types';

function FilterBar({ cities, onFilterChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="city-filter">Filter by city:</label>
      <select id="city-filter" onChange={e => onFilterChange(e.target.value)}>
        <option value="">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}

FilterBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterBar;
