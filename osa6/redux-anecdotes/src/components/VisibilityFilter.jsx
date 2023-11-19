// VisibilityFilter.jsx
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
<div>
  <table className='option-table'>
    <thead>
      <tr>
        <th>Filter</th>
        <th>Option</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <label>
            All
          </label>
        </td>
        <td>
          <input
            type="radio"
            name="filter"
            onChange={() => dispatch(setFilter('ALL'))}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label>
            Important
          </label>
        </td>
        <td>
          <input
            type="radio"
            name="filter"
            onChange={() => dispatch(setFilter('IMPORTANT'))}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label>
            Non-important
          </label>
        </td>
        <td>
          <input
            type="radio"
            name="filter"
            onChange={() => dispatch(setFilter('NONIMPORTANT'))}
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

  );
};

export default VisibilityFilter;
