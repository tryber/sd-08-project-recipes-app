import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchFood from '../services/FoodApi';
import fetchDrink from '../services/CocktailApi';
import fetchCategories from '../services/FoodCategoriesApi';
import fetchCocktailCategories from '../services/CocktailCategoriesApi';

const searchParams = {
  selectedParam: '',
  inputSearch: '',
  id: '',
};
const urlIngredientesFood = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const urlListArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const RecipesAll = 'search.php?s=';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [FoodCategories, setCategories] = useState([]);
  const [DrinkCategories, setDrinkCategories] = useState([]);
  const [searchParam, setSearchParam] = useState(searchParams);
  const [recipeDetails, setRecipeDetails] = useState();
  const [foodIngredients, setfoodIngredients] = useState([]);
  const [listArea, setListArea] = useState([]);
  const history = useHistory();
  const pathName = history.location.pathname;

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  useEffect(() => {
<<<<<<< HEAD
    const { selectedParam, inputSearch, id } = searchParam;

    switch (selectedParam) {
    case 'ingredient':
      fetchFood(`filter.php?i=${inputSearch}`)
        .then((response) => setRecipes(response));
      break;
    case 'name':
      fetchFood(`search.php?s=${inputSearch}`)
        .then((response) => setRecipes(response));
      break;
    case 'first-letter':
      fetchFood(`search.php?f=${inputSearch}`)
        .then((response) => setRecipes(response));
      break;
    case 'food-details':
      fetchFood(`lookup.php?i=${id}`)
        .then((response) => setRecipeDetails(response.meals[0]));
      break;
    default:
      fetchFood('search.php?s=').then((response) => setRecipes(response));
      break;
=======
    const { selectedParam, inputSearch } = searchParam;

    if (pathName === '/comidas') {
      switch (selectedParam) {
      case 'ingredient':
        fetchFood(`filter.php?i=${inputSearch}`)
          .then((response) => setRecipes(response));
        break;
      case 'name':
        fetchFood(`search.php?s=${inputSearch}`)
          .then((response) => setRecipes(response));
        break;
      case 'first-letter':
        fetchFood(`search.php?f=${inputSearch}`)
          .then((response) => setRecipes(response));
        break;
      default:
        fetchFood(RecipesAll).then((response) => setRecipes(response));
        break;
      }
>>>>>>> ad948a0fb887a54ca775f78d68cc1bc2c3a0e97f
    }
  }, [searchParam, pathName]);

  useEffect(() => {
<<<<<<< HEAD
    const { selectedParam, inputSearch, id } = searchParam;

    switch (selectedParam) {
    case 'ingredient':
      fetchDrink(`filter.php?i=${inputSearch}`)
        .then((response) => setCocktails(response));
      break;
    case 'name':
      fetchDrink(`search.php?s=${inputSearch}`)
        .then((response) => setCocktails(response));
      break;
    case 'first-letter':
      fetchDrink(`search.php?f=${inputSearch}`)
        .then((response) => setCocktails(response));
      break;
    case 'drink-details':
      fetchDrink(`lookup.php?i=${id}`)
        .then((response) => setRecipeDetails(response.drinks[0]));
      break;
    default:
      fetchDrink('search.php?s=').then((response) => setCocktails(response));
      break;
=======
    const { selectedParam, inputSearch } = searchParam;

    if (pathName === '/bebidas') {
      switch (selectedParam) {
      case 'ingredient':
        fetchDrink(`filter.php?i=${inputSearch}`)
          .then((response) => setCocktails(response));
        break;
      case 'name':
        fetchDrink(`search.php?s=${inputSearch}`)
          .then((response) => setCocktails(response));
        break;
      case 'first-letter':
        fetchDrink(`search.php?f=${inputSearch}`)
          .then((response) => setCocktails(response));
        break;
      default:
        fetchDrink(RecipesAll).then((response) => setCocktails(response));
        break;
      }
>>>>>>> ad948a0fb887a54ca775f78d68cc1bc2c3a0e97f
    }
  }, [searchParam, pathName]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetchCocktailCategories().then((data) => setDrinkCategories(data));
  }, []);

  useEffect(() => {
    async function apiIngredientesFood() {
      const apiIngredientes = await fetch(urlIngredientesFood)
        .then((json) => json.json())
        .then((data) => data.meals)
        .catch((error) => console.log(error));

      setfoodIngredients(apiIngredientes);
    }
    apiIngredientesFood();
  }, []);
  useEffect(() => {
    async function apiAreaFood() {
      const apiArea = await fetch(urlListArea)
        .then((json) => json.json())
        .then((data) => data.meals)
        .catch((error) => console.log(error));

      setListArea(apiArea);
    }
    apiAreaFood();
  }, []);
  useEffect(() => {
    const { selectedParam, inputSearch } = searchParam;

    if (pathName === '/explorar/comidas/area') {
      switch (selectedParam) {
      case 'option':
        fetchFood(`filter.php?a=${inputSearch}`)
          .then((response) => setRecipes(response));
        break;
      case 'option-All':
        fetchFood(RecipesAll)
          .then((response) => setRecipes(response));
        break;
      default:
        fetchFood(RecipesAll).then((response) => setRecipes(response));
        break;
      }
    }
  }, [searchParam, pathName]);

  const provide = {
    email,
    password,
    handleEmail,
    handlePassword,
    searchParam,
    setSearchParam,
    recipes,
    setRecipes,
    cocktails,
    setCocktails,
    FoodCategories,
    DrinkCategories,
    recipeDetails,
    foodIngredients,
    history,
    listArea,
  };

  return (
    <RecipesContext.Provider value={ provide }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
