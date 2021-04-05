import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  filterFirstLetter,
  filterIngredient, filterName, filterCategory } from '../services/api';

export const FoodCtx = createContext();

function ContextFood(props) {
  const { children } = props;
  const [foodApi, setFoodApi] = useState([]);
  const [filterFood, setFilterFood] = useState({ key: 'name', value: '' });
  const { key, value } = filterFood;

  useEffect(() => {
    async function connect() {
      if (key === 'ing') {
        const i = await filterIngredient(value, 'Foods');
        return setFoodApi(i);
      }
      if (key === 'name') {
        const n = await filterName(value, 'Foods');
        return setFoodApi(n);
      }
      if (key === 'first') {
        if (value.length > 1) {
          // eslint-disable-next-line no-alert
          alert('Sua busca deve conter somente 1 (um) caracter');
          return;
        }
        const f = await filterFirstLetter(value, 'Foods');
        return setFoodApi(f);
      }
      if (key === 'category') {
        const c = await filterCategory(value, 'Foods');
        return setFoodApi(c);
      }
    }
    connect();
  }, [key, value]);

  return (
    <FoodCtx.Provider
      value={ { foodApi, setFoodApi, filterFood, setFilterFood } }
    >
      {children}
    </FoodCtx.Provider>
  );
}

ContextFood.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ContextFood;
