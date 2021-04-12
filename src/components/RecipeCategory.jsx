import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

const FIRST_FIVE_CATEGORY = 5;

export default function RecipeCategory({ recipeType }) {
  const {
    isFetching,
    apiReturnCategory,
    requestApiCategory,
    onClickCategoryFetch,
    setToggle,
  } = useContext(Context);

  const [selectedCategory, setSelectedCategory] = useState('all');

  async function toggleFunc([serviceEndpoint, category], categoryValue) {
    await onClickCategoryFetch(serviceEndpoint, category);
    if (categoryValue !== 'all') {
      setSelectedCategory(categoryValue);
      if (selectedCategory === categoryValue) setToggle(false);
      else setToggle(true);
    } else setToggle(false);
  }

  useEffect(() => {
    requestApiCategory();
  }, []);

  function setType(type) {
    const typeCategory = type === 'meals'
      ? apiReturnCategory.length && apiReturnCategory[0]
      : apiReturnCategory.length && apiReturnCategory[1];
    const endpoint = type === 'meals' ? 'themealdb' : 'thecocktaildb';
    const typeCategoryPopulated = typeCategory[type];

    return (
      <div className="category-container">
        <button
          className="category-button"
          type="button"
          onClick={ () => setToggle(false) }
          data-testid="All-category-filter"
        >
          All
        </button>
        {typeCategoryPopulated
          && typeCategoryPopulated.length
          && typeCategoryPopulated
            .slice(0, FIRST_FIVE_CATEGORY)
            .map((category) => (
              <button
                className="category-button"
                type="button"
                key={ `${category.strCategory}` }
                value={ `${category.strCategory}` }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={
                  (e) => toggleFunc([endpoint, category.strCategory], e.target.value)
                }
              >
                {category.strCategory}
              </button>
            ))}
      </div>
    );
  }

  function renderCategory() {
    return setType(recipeType);
  }
  return isFetching ? <p>Loading...</p> : renderCategory();
}

RecipeCategory.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
