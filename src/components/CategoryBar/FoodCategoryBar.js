import React, { useContext } from 'react';
import GlobalContext from '../../context/globalContext/GlobalContext';

function FoodCategoryBar() {
  const {
    values: { foodCategory },
    functions: { handleFilteredMeals },
  } = useContext(GlobalContext);

  const maxCategories = 5;

  return (
    <div className="search-button-container">
      <button
        type="button"
        key="All"
        data-testid="All-category-filter"
        className="page-buttons"
        onClick={ handleFilteredMeals }
      >
        All
      </button>
      {foodCategory.map(({ strCategory }, index) => {
        if (index >= maxCategories) {
          return '';
        }
        return (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            className="page-buttons"
            onClick={ handleFilteredMeals }
          >
            {strCategory}
          </button>
        );
      })}
    </div>
  );
}

export default FoodCategoryBar;
