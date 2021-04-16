import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import fetchMealCatsThunk from '../redux/actions/fetchMealCatsAction';
import filterMealCatsAction from '../redux/actions/filterMealCatAction';

function MealCatsButtons() {
  const { meals } = useSelector((state) => state.recipes.categories);
  const FIVE = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => dispatch(fetchMealCatsThunk());
    fetchData();
  }, []);
  const { mealFilter } = useSelector((state) => state.search);

  function handleClick({ target }) {
    if (mealFilter !== target.value) {
      dispatch(filterMealCatsAction(target.value));
    } else {
      dispatch(clearRecipesAction());
      dispatch(clearSearchAction());
    }
  }

  return (
    <div className="category-buttons-container">
      { meals && meals.map((elem, index) => (
        (index < FIVE) && (
          <button
            type="button"
            key={ elem.strCategory }
            value={ elem.strCategory }
            onClick={ (event) => handleClick(event) }
            data-testid={ `${elem.strCategory}-category-filter` }
            className="regular-button"
          >
            { elem.strCategory }
          </button>
        )
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          dispatch(clearRecipesAction());
          dispatch(clearSearchAction());
        } }
        className="regular-button"
      >
        All
      </button>
    </div>
  );
}

export default MealCatsButtons;
