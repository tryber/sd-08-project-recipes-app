import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import fetchDrinkThunk from '../redux/actions/fetchDrinkAction';
import fetchDrinkCatsThunk from '../redux/actions/fetchDrinkCatsAction';
import filterDrinkCatsAction from '../redux/actions/filterDrinkCatAction';

function DrinkCatsButtons() {
  const categories = useSelector((state) => state.recipes.categories);
  const { drinks } = categories;
  const FIVE = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => dispatch(fetchDrinkCatsThunk());
    fetchData();
  }, []);

  return (
    <div>
      { drinks && drinks.map((elem, index) => (
        index < FIVE ? (
          <button
            type="button"
            key={ elem.strCategory }
            value={ elem.strCategory }
            onClick={ (event) => dispatch(filterDrinkCatsAction(event.target.value)) }
            data-testid={ `${elem.strCategory}-category-filter` }
          >
            { elem.strCategory }
          </button>
        ) : ''
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => dispatch(filterDrinkCatsAction('')) }
      >
        All
      </button>
    </div>
  );
}

export default DrinkCatsButtons;
