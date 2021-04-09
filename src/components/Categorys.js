import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import filterCategoryRequest from '../services/filterCategoryRequest';
import firstRequest from '../services/firstRequest';
import '../styles/Categorys.css';

function Categorys({ title }) {
  const {
    categoryComidas,
    categoryBebidas,
    setComidas,
    setBebidas,
    setToggleCategoryFilter,
    toggleCategoryFilter,
  } = useContext(MyContext);
  const LIMIT = 4;
  let arrayCategory = [];

  if (title === 'Comidas') {
    arrayCategory = categoryComidas;
  } else {
    arrayCategory = categoryBebidas;
  }

  async function firstContent() {
    const { comidasApi, bebidasApi } = await firstRequest();
    setComidas(comidasApi.meals);
    setBebidas(bebidasApi.drinks);
    setToggleCategoryFilter(false);
  }

  async function categoryFilter({ target }) {
    if (target.classList.contains('ativo')) {
      target.classList.remove('ativo');
      firstContent();
      return null;
    }
    target.classList.add('ativo');
    const { foodRequest, drinkRequest } = await filterCategoryRequest(target.name);
    if (drinkRequest) {
      setBebidas(drinkRequest);
    } else {
      setComidas(foodRequest);
    }
  }

  return (
    <div className="category-btn-container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ firstContent }
      >
        All
      </button>
      { arrayCategory.map((item, index) => {
        if (index <= LIMIT) {
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ toggleCategoryFilter ? firstContent : categoryFilter }
              name={ item.strCategory }
            >
              {item.strCategory}
            </button>
          );
        }
        return null;
      }) }
    </div>
  );
}

Categorys.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Categorys;
