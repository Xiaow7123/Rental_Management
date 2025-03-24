import React from 'react';

function FilterBar() {
  return (
    <div className="filter-bar">
      <label>
        Filter by city:
        <input type="text" placeholder="Type to filter..." />
      </label>
      {/* Add more filter options as needed */}
    </div>
  );
}

export default FilterBar;
