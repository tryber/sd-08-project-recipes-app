import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionThunkCategoryDrinks,
  actionThunkCategoryFoods,
  actionResetFilteredByCategory,
} from '../redux/actions';

import Button from './Button';

const CategoriesContainer = ({ page, callback }) => {
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
    } else if (page === 'Favoritas') {
      buttons = [
        {
          strCategory: 'All',
        },
        {
          strCategory: 'Food',
        },
        {
          strCategory: 'Drink',
        },
      ];
      return buttons.map((button) => (
        <Button
          className="btn btn-warning"
          name={ button.strCategory }
          key={ button.strCategory }
          data-testid={ `filter-by-${button.strCategory.toLowerCase()}-btn` }
          onClick={ () => callback(button.strCategory) }
        />
      ));
    }
    return buttons.map((button) => (
      <Button
        className="btn btn-warning"
        name={ button.strCategory }
        key={ button.strCategory }
        data-testid={ `${button.strCategory}-category-filter` }
        onClick={ () => handleClick(button.strCategory) }
      />
    ));
  };
  return <section className="div-button">{showCategoriesButtons()}</section>;
};

CategoriesContainer.propTypes = {
  page: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

CategoriesContainer.defaultProps = {
  callback: () => undefined,
};

export default CategoriesContainer;
