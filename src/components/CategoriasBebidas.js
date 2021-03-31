import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

import '../styles/Categorias.css';

function CategoriasFood() {
  const { drinkCategory, setMeals,
    setIsDrinkLoading, directRequestDrink } = useContext(RecipeContext);
  const MIN_ELEMN = 5;

  const fetchCategory = async (value) => {
    setIsDrinkLoading(true);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
    const result = await response.json();
    setMeals(result.drinks);
    setIsDrinkLoading(false);
  };

  return (
    <div className="categorias">
      <button
        type="button"
        onClick={ () => directRequestDrink() }
        data-testid="All-category-filter"
      >
        All
      </button>
      {drinkCategory.map((elem, index) => {
        if (index < MIN_ELEMN) {
          return (
            <button
              className=".drink-btn"
              data-testid={ `${elem.strCategory}-category-filter` }
              type="button"
              value={ elem.strCategory }
              onClick={ ({ target }) => {
                target.firstChild.checked = !target.firstChild.checked;
                return (
                  target.firstChild.checked
                    ? fetchCategory(target.value) : directRequestDrink());
              } }
              key={ elem.strCategory }
            >
              <input style={ { display: 'none' } } type="checkbox" />
              {elem.strCategory}
            </button>);
        }
        return '';
      })}
    </div>
  );
}

export default CategoriasFood;
