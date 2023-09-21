import React from 'react';

const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
      Filter phonebook: <br />
      <input value={filterText} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
