import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

import '../styles/Categorias.css';

function CategoriasFood() {
  const { foodCategory, directRequestFood,
    setIsDrinkLoading, setMeals } = useContext(RecipeContext);
  const MIN_ELEMN = 5;

  const fetchCategory = async (value) => {
    setIsDrinkLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
    const result = await response.json();
    setMeals(result.meals);
    setIsDrinkLoading(false);
  };

  return (
    <div className="categorias">
      <button
        type="button"
        onClick={ () => directRequestFood() }
        data-testid="All-category-filter"
      >
        All
      </button>
      {foodCategory.map((elem, index) => {
        if (index < MIN_ELEMN) {
          return (
            <button
              data-testid={ `${elem.strCategory}-category-filter` }
              type="button"
              value={ elem.strCategory }
              onClick={ ({ target }) => {
                target.firstChild.checked = !target.firstChild.checked;
                return (
                  target.firstChild.checked
                    ? fetchCategory(target.value) : directRequestFood());
              } }
              key={ elem.strCategory }
            >
              <input type="checkbox" style={ { display: 'none' } } />
              {elem.strCategory}
            </button>);
        }
        return '';
      })}
    </div>
  );
}

export default CategoriasFood;
