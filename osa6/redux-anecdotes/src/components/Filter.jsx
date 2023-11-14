import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
import '../styles.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter);

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <div> Search Engine: </div>
<input value={filterValue} onChange={handleChange} />
    </div>
  );
};

export default Filter;
