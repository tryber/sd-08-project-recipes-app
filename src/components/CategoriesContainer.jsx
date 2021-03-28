import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionThunkCategoryDrinks,
  actionThunkCategoryFoods,
  actionResetFilteredByCategory,
} from '../redux/actions';

import Button from './Button';

const CategoriesContainer = ({ page }) => {
  const foodsCategories = useSelector(
    (state) => state.CategoriesRecipes.foodsCategories,
  );
  const drinksCategories = useSelector(
    (state) => state.CategoriesRecipes.drinksCategories,
  );

  const previousCategory = useSelector(
    (state) => state.FilterByCategory.category,
  );

  const dispatch = useDispatch();

  const handleClick = (category) => {
    if (previousCategory === category) {
      dispatch(actionResetFilteredByCategory(''));
    } else if (category === 'All') {
      dispatch(actionResetFilteredByCategory(''));
    } else if (page === 'Comidas') {
      dispatch(actionThunkCategoryFoods(category));
    } else if (page === 'Bebidas') {
      dispatch(actionThunkCategoryDrinks(category));
    }
  };

  const showCategoriesButtons = () => {
    let buttons = [];
    if (page === 'Comidas') {
      buttons = [
        {
          strCategory: 'All',
        },
        ...foodsCategories,
      ];
    } else if (page === 'Bebidas') {
      buttons = [
        {
          strCategory: 'All',
        },
        ...drinksCategories,
      ];
    }
    return buttons.map((button) => (
      <Button
        className="btn btn-secondary categories-btn"
        name={ button.strCategory }
        key={ button.strCategory }
        data-testid={ `${button.strCategory}-category-filter` }
        onClick={ () => handleClick(button.strCategory) }
      />
    ));
  };
  return <section className="categories">{showCategoriesButtons()}</section>;
};

CategoriesContainer.propTypes = {
  page: PropTypes.string.isRequired,
};

export default CategoriesContainer;
