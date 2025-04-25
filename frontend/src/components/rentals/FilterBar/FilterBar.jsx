import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterBar.module.css';

function FilterBar({ cities, countries, amenities, onFilterChange, sortBy }) {
  return (
    <div className={styles['filter-bar']}>
      <label htmlFor="city-filter">City:</label>
      <select id="city-filter" onChange={e => onFilterChange('city', e.target.value)}>
        <option value="">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <label htmlFor="country-filter">Country:</label>
      <select id="country-filter" onChange={e => onFilterChange('country', e.target.value)}>
        <option value="">All Countries</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <label htmlFor="amenities-filter">Amenity:</label>
      <select id="amenities-filter" onChange={e => onFilterChange('amenities', e.target.value)}>
        <option value="">All Amenities</option>
        {amenities.map(amenity => (
          <option key={amenity} value={amenity}>{amenity}</option>
        ))}
      </select>

      <label htmlFor="sort-filter">Sort by:</label>
      <select id="sort-filter" value={sortBy} onChange={e => onFilterChange('sortBy', e.target.value)}>
        <option value="">None</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="sqft-asc">SqFt ↑</option>
        <option value="sqft-desc">SqFt ↓</option>
      </select>
    </div>
  );
}

FilterBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string,
};

export default FilterBar;
