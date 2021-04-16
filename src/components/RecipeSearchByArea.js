import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAreaThunk from '../redux/actions/fetchAreaAction';
import selectAreaAction from '../redux/actions/SelectAreaAction';

function RecipeSearchByArea() {
  const [area, setArea] = useState('');
  const { areas } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => dispatch(fetchAreaThunk());
    fetchData();
  }, []);

  const handleChange = (e) => {
    setArea(e.target.value);
    dispatch(selectAreaAction(e.target.value));
  };

  return (
    <select
      data-testid="explore-by-area-dropdown"
      value={ area }
      onChange={ handleChange }
      className="regular-button area-search-input"
    >
      {areas && areas.map((meal, i) => (
        <option
          key={ i }
          data-testid={ `${meal.strArea}-option` }
          value={ meal.strArea === 'All' ? '' : meal.strArea }
        >
          {meal.strArea}
        </option>))}
    </select>
  );
}

export default RecipeSearchByArea;
