import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import
{ getFoodIngredients,
  getFoodFirstLetter,
  getFoodName,
  getDrinkIngredients,
  getDrinkName,
  getDrinkFirstLetter,
  getFoodRandom,
  getDrinkRandom } from '../services/API';

export default function RecipesProvider({ children }) {
  const [data, setData] = useState({ food: [], drink: [] });
  const history = useHistory();
  const { location: { pathname } } = history;

  const foodRandom = async () => {
    setData({ ...data, food: await getFoodRandom() });
  };

  const drinkRandom = async () => {
    setData({ ...data, drink: await getDrinkRandom() });
  };

  const getAPI = async (radio, textInput, path) => {
    switch (radio) {
    case ('ingredient'):
      return path === '/comidas'
        ? setData({
          ...data,
          food: await getFoodIngredients(textInput) })
        : setData({
          ...data,
          drink: await getDrinkIngredients(textInput) });
    case ('name'):
      return path === '/comidas'
        ? setData({
          ...data,
          food: await getFoodName(textInput) })
        : setData({
          ...data,
          drink: await getDrinkName(textInput) });
    case ('firstLetter'):
      if (textInput.length > 1) {
        return window.alert(
          'Sua busca deve conter somente 1 (um) caracter',
        );
      }
      return path === '/comidas'
        ? setData({
          ...data,
          food: await getFoodFirstLetter(textInput) })
        : setData({
          ...data,
          drink: await getDrinkFirstLetter(textInput) });

    default:
      break;
    }
  };

  useEffect(() => {
    if (pathname === '/comidas'
      && (data.food !== null)) {
      const l = data.food.length;
      if (l > 0) {
        return l > 1
          ? history.push('/comidas')
          : history.push(`/comidas/${data.food[0].idMeal}`);
      }
    } if (pathname === '/bebidas'
    && (data.drink !== null)) {
      const l = data.drink.length;
      if (l > 0) {
        return l > 1
          ? history.push('/bebidas')
          : history.push(`/bebidas/${data.drink[0].idDrink}`);
      }
    }
  }, [data]);

  const context = {
    getAPI, data, setData, foodRandom, drinkRandom };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
