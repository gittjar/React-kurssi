// VisibilityFilter.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <label>
        All
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(setFilter('ALL'))}
        />
      </label>
      <label>
        Important
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(setFilter('IMPORTANT'))}
        />
      </label>
      <label>
        Non-important
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(setFilter('NONIMPORTANT'))}
        />
      </label>
    </div>
  );
};

export default VisibilityFilter;
