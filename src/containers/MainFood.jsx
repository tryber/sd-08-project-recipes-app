import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import RecipesContext from '../core/RecipesContext';
import components from '../components/index';

import api from '../services/index';
import { MAIN_FOOD_CARD_LENGTH_12, CATEGORIES_LENGTH_5 } from '../constants';
import MainCard from '../components/MainCard';
//  import loading from '../assets/oval.svg';
// <img className="loading-img" src={ loading } alt="loading icon" />

function Home() {
  const { isLoading, mealData, byIngredient,
    ingredientName } = useContext(RecipesContext);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataFoodsCategories, setDataFoodCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [selected, setSelected] = useState(false);
  const location = useLocation();
  function handleClick({ target }) {
    setCategorySelected(target.value);
    if (categorySelected !== target.value && categorySelected.length > 0) {
      setSelected(selected);
    } else {
      setSelected(!selected);
    }
  }

  useEffect(() => {
    api.fetchCategoriesFood()
      .then((response) => response.json())
      .then((result) => setDataFoodCategories(result.meals));
    if (categorySelected.length && selected) {
      api.fetchFoodByCategory(categorySelected)
        .then((response) => response.json())
        .then((result) => setDataFoods(result.meals));
    } else if (byIngredient && ingredientName) {
      api.searchByFoodIngredient(ingredientName)
        .then((response) => response.json())
        .then((result) => setDataFoods(result.meals));
    } else {
      api.fetchMeals()
        .then((response) => response.json())
        .then((result) => setDataFoods(result.meals));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected, selected]);
  return (
    <div>
      <components.Header title="Comidas" />
      {isLoading ? 'Loading...' : null}
      <div className="main-foods-buttons-container">
        <button
          className="btn btn-primary"
          style={ { marginTop: 5,
            marginBottom: 5,
            width: 106 } }
          onClick={ () => {
            setCategorySelected([]);
            setSelected(false);
          } }
          type="button"
          data-testid="All-category-filter"
        >
          All
        </button>
        {dataFoodsCategories.slice(0, CATEGORIES_LENGTH_5).map(
          ({ strCategory }, index) => (
            <button
              className="btn btn-primary"
              style={ { marginTop: 5,
                marginBottom: 5,
                width: 106 } }
              onClick={ handleClick }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ index }
            >
              {strCategory}
            </button>
          ),
        )}
      </div>
      <div className="home-container">
        {mealData.length && !selected && mealData.length !== 1
          ? mealData.slice(0, MAIN_FOOD_CARD_LENGTH_12).map((curr, index) => (
            <MainCard
              path={ `${location.pathname}/${curr.idMeal}` }
              key={ index }
              data={ curr }
              index={ index }
              id={ curr.idMeal }
            />
          ))
          : dataFoods.slice(0, MAIN_FOOD_CARD_LENGTH_12).map((food, index) => (
            <MainCard
              path={ `${location.pathname}/${food.idMeal}` }
              key={ index }
              data={ food }
              index={ index }
              id={ food.idMeal }
            />
          ))}
        { mealData.length && !selected && mealData.length === 1
          ? <Redirect to={ `/comidas/${mealData[0].idMeal}` } /> : null }
        <components.Footer />
      </div>
    </div>
  );
}

export default Home;
