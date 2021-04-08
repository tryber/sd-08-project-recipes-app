import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useRouteMatch } from 'react-router';
import FilterButton from '../FilterButton';
import {
  filterBtnFood,
  filterBtnDrink,
  foodsOnMount,
  drinksOnMount,
} from '../../redux/actions';

function FilterButtonsSection() {
  const FIVE_BUTTONS = 5;
  const { categories: foods } = useSelector((state) => state.foods);
  const { categories: drinks } = useSelector((state) => state.drinks);
  const [useCategories, setUseCategories] = useState([{}]);
  const [currentCategory, setCurrentCategory] = useState('All');
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (path === '/comidas') {
      setUseCategories(foods);
    }
  }, [foods, path]);

  useEffect(() => {
    if (path === '/bebidas') {
      setUseCategories(drinks);
    }
  }, [drinks, path]);

  useEffect(() => {

  });

  const handleCurrentCategory = (btnName) => {
    if (path === '/comidas' && btnName !== currentCategory && btnName !== 'All') {
      setCurrentCategory(btnName);
      dispatch(filterBtnFood(btnName));
    } else if (path === '/bebidas' && btnName !== currentCategory && btnName !== 'All') {
      setCurrentCategory(btnName);
      dispatch(filterBtnDrink(btnName));
    } else if (path === '/comidas') {
      setCurrentCategory('All');
      dispatch(foodsOnMount());
    } else {
      setCurrentCategory('All');
      dispatch(drinksOnMount());
    }
  };

  return (
    <ButtonGroup toggle className="mb-2 d-flex flex-wrap">
      <ToggleButton
        type="checkbox"
        variant="light"
        checked={ currentCategory === 'All' }
        data-testid="All-category-filter"
        onChange={ () => handleCurrentCategory('All') }
        className="border-warning"
      >
        All
      </ToggleButton>
      { useCategories.map(({ strCategory }, index) => (
        index < FIVE_BUTTONS
        && <FilterButton
          name={ strCategory }
          key={ index }
          currentCategory={ currentCategory }
          changeCategory={ handleCurrentCategory }
        />
      ))}
    </ButtonGroup>
  );
}

export default FilterButtonsSection;
