import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getMealByIngredients,
  getMealByName,
  getMealByFirstLetter,
  getMealCategories,
  getMealsByCategory,
} from '../services/getAPIs';

export const LoginAndFoodContext = createContext();

function FoodContext(props) {
  const history = useHistory();
  const [ingredientSearchRadio, setIngredientSearchRadio] = useState(false);
  const [nameSearchRadio, setNameSearchRadio] = useState(false);
  const [firstLetterSearchRadio, setFirstLetterSearchRadio] = useState(false);
  const [meals, setMeals] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [searchInputMeal, setSearchInputMeal] = useState([]);
  const [data, setData] = useState({ email: '', password: '' });
  const [tokens, setTokens] = useState({ mealsToken: '', cocktailsToken: '' });

  useEffect(() => {
    async function fetchDataMeal() {
      const initialContentMeal = await getMealByIngredients('');
      setMeals(initialContentMeal);
    }
    fetchDataMeal();
    async function fetchCategoriesMeal() {
      const initialCategoriesMeal = await getMealCategories();
      setCategoriesMeals(initialCategoriesMeal);
    }
    fetchCategoriesMeal();
  }, []);
  const myCustomAlert = (text) => {
    const myAlert = window.alert;
    myAlert(text);
  };
  const handleClickSearch = useCallback(async () => {
    if (nameSearchRadio) {
      const res = await getMealByName(searchInputMeal);
      if (res === null) {
        myCustomAlert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
        return null;
      }
      if (res.length === 1) {
        const onlyMeal = [res[0]];
        onlyMeal.map((item) => history.push(`/comidas/${item.idMeal}`));
      }
      setMeals(res);
    }
    if (!!firstLetterSearchRadio && searchInputMeal.length === 1) {
      const res = await getMealByFirstLetter(searchInputMeal);
      setMeals(res);
    }
    if (!!firstLetterSearchRadio && searchInputMeal.length !== 1) {
      myCustomAlert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (ingredientSearchRadio) {
      const res = await getMealByIngredients(searchInputMeal);
      setMeals(res);
    }
  }, [
    firstLetterSearchRadio,
    history,
    ingredientSearchRadio,
    nameSearchRadio,
    searchInputMeal,
  ]);

  useEffect(() => {
    if (
      [ingredientSearchRadio, nameSearchRadio, firstLetterSearchRadio].includes(
        true,
      )
    ) {
      handleClickSearch();
    }
  }, [
    firstLetterSearchRadio,
    handleClickSearch,
    ingredientSearchRadio,
    nameSearchRadio,
  ]);

  const handleChangeEmail = (e) => {
    setData({ ...data, email: e });
  };

  const handleChangePassword = (e) => {
    setData({ ...data, password: e });
    setTokens({
      ...tokens,
      mealsToken: 1,
      cocktailsToken: 1,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { mealsToken, cocktailsToken } = tokens;
    const { email: emailToSave } = data;
    const email = { email: emailToSave };
    localStorage.setItem('mealsToken', JSON.stringify(mealsToken));
    localStorage.setItem('cocktailsToken', JSON.stringify(cocktailsToken));
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/comidas');
  };
  const handleSearchByIngredients = () => {
    setIngredientSearchRadio(!ingredientSearchRadio);
    if (nameSearchRadio) setNameSearchRadio(!nameSearchRadio);
    if (firstLetterSearchRadio) setFirstLetterSearchRadio(!firstLetterSearchRadio);
  };

  const handleSearchByName = () => {
    setNameSearchRadio(!nameSearchRadio);
    if (ingredientSearchRadio) setIngredientSearchRadio(!ingredientSearchRadio);
    if (firstLetterSearchRadio) setFirstLetterSearchRadio(!firstLetterSearchRadio);
  };

  const handleSearchByFirstLetter = () => {
    setFirstLetterSearchRadio(!firstLetterSearchRadio);
    if (ingredientSearchRadio) setIngredientSearchRadio(!ingredientSearchRadio);
    if (nameSearchRadio) setNameSearchRadio(!nameSearchRadio);
  };

  const handleChangeSearch = (e) => {
    setSearchInputMeal(e);
  };

  const handleByCategoryMeal = async (category) => {
    if (category === categoryMeals) {
      const resetFilter = await getMealByIngredients('');
      setMeals(resetFilter);
    } else if (category === 'all') {
      const mealsByCategory = await getMealByIngredients('');
      setMeals(mealsByCategory);
      setCategoryMeals(category);
    } else {
      const mealsByCategory = await getMealsByCategory(category);
      setMeals(mealsByCategory);
      setCategoryMeals(category);
    }
  };

  const checkValidity = () => {
    const lengthOfPwd = 6;
    const { email, password } = data;
    if (
      password.length > lengthOfPwd
      && /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
        email,
      )
    ) return false;
    return true;
  };
  const { children } = props;
  return (
    <div>
      <LoginAndFoodContext.Provider
        value={ {
          handleChangeEmail,
          handleChangePassword,
          handleSubmit,
          checkValidity,
          handleChangeSearch,
          handleSearchByIngredients,
          handleSearchByFirstLetter,
          handleSearchByName,
          handleClickSearch,
          handleByCategoryMeal,
          setSearchInputMeal,
          nameSearchRadio,
          ingredientSearchRadio,
          firstLetterSearchRadio,
          searchInputMeal,
          data,
          tokens,
          meals,
          categoryMeals,
          categoriesMeals,
        } }
      >
        {children}
      </LoginAndFoodContext.Provider>
    </div>
  );
}
export default FoodContext;
FoodContext.propTypes = {
  children: PropTypes.node.isRequired,
};
