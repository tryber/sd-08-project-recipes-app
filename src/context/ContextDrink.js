import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterFirstLetter,
  filterIngredient, filterName, filterCategory } from '../services/api';

export const DrinkCtx = createContext();

function ContextDrink(props) { // ??
  const { children } = props;
  const [drinkApi, setDrinkApi] = useState([]);
  const [filterDrink, setFilterDrink] = useState({ key: 'name', value: '' });
  const { key, value } = filterDrink;

  useEffect(() => {
    async function connect() {
      if (key === 'ing') {
        const i = await filterIngredient(value, 'Drinks');
        return setDrinkApi(i);
      }
      if (key === 'name') {
        const n = await filterName(value, 'Drinks');
        return setDrinkApi(n);
      }
      if (key === 'first') {
        if (value.length > 1) {
          // eslint-disable-next-line no-alert
          alert('Sua busca deve conter somente 1 (um) caracter');
          return;
        }
        const f = await filterFirstLetter(value, 'Drinks');
        console.log(value);
        return setDrinkApi(f);
      }
      if (key === 'category') {
        const c = await filterCategory(value, 'Drinks');
        return setDrinkApi(c);
      }
    }
    connect();
  }, [key, value]);

  return (
    <DrinkCtx.Provider
      value={ { drinkApi, setDrinkApi, filterDrink, setFilterDrink } }
    >
      {children}
    </DrinkCtx.Provider>
  );
}

ContextDrink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ContextDrink;
