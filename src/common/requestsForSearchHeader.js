import {
  requestByName,
  requestByIngredient,
  requestByFirstLetter,
} from '../services/requestFoodsAPI';
import {
  requestDrinkByName,
  requestDrinkByIngredient,
  requestDrinkByFirstLetter,
} from '../services/requestDrinksAPI';

export const requestsForSearchHeaderFoods = async (searchText, filterRadio) => {
  if (searchText === '') {
    alert('Digite alguma coisa!');
  } else if (filterRadio === 'ingredient') {
    const foods = await requestByIngredient(searchText);
    return foods;
  } else if (filterRadio === 'name') {
    const foods = await requestByName(searchText);
    return foods;
  } else if (filterRadio === 'first-letter') {
    if (searchText.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const foods = await requestByFirstLetter(searchText);
    return foods;
  } else {
    alert('Escolha uma opção!');
  }
};

export const requestsForSearchHeaderDrinks = async (
  searchText,
  filterRadio,
) => {
  if (searchText === '') {
    alert('Digite alguma coisa!');
  } else if (filterRadio === 'ingredient') {
    const foods = await requestDrinkByIngredient(searchText);
    return foods;
  } else if (filterRadio === 'name') {
    const foods = await requestDrinkByName(searchText);
    return foods;
  } else if (filterRadio === 'first-letter') {
    if (searchText.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const foods = await requestDrinkByFirstLetter(searchText);
    return foods;
  } else {
    alert('Escolha uma opção!');
  }
};
