import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/header/Header';

export default function FeitasFavoritas() {
  const history = useHistory();
  const path = history.location.pathname;
  // let listCart = [];
  // let listFavCart = [];
  const listCart = JSON.parse(localStorage.getItem('doneRecipes'));
  const listFavCart = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredDoneList, setDoneList] = useState([]);
  // const [FList, setFavList] = useState(listFavCart);
  const [FList, setFavList] = useState([]);

  const unfavRecipe = (recipeId) => {
    const updatedFavs = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((recipe) => recipe.id !== recipeId);
    setFavList(updatedFavs);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavs));
    // updatedFavs.filter((recipe) => recipe.id !== recipeId);
    // localStorage.favoriteRecipes = updatedFavs;
  };

  useEffect(() => {
    if (listCart) { setDoneList(listCart); }
    if (listFavCart) { setFavList(listFavCart); }
  }, []);

  // useEffect(() => {
  //   setFavList(listFavCart);
  // }, [listFavCart]);

  if (path === '/receitas-feitas') {
    return (
      <div>
        <Header title="Receitas Feitas" showSearchButton={ false } />
        <label htmlFor="All">
          <input
            type="radio"
            name="filter"
            value="All"
            id="All"
            data-testid="filter-by-all-btn"
            onClick={ () => setDoneList(listCart) }
          />
          All
        </label>
        <label htmlFor="Food">
          <input
            type="radio"
            name="filter"
            value="Food"
            id="Food"
            data-testid="filter-by-food-btn"
            onClick={ () => setDoneList(listCart.filter((a) => a.type === 'comida')) }
          />
          Food
        </label>
        <label htmlFor="Drinks">
          <input
            type="radio"
            name="filter"
            value="Drinks"
            id="Drinks"
            data-testid="filter-by-drink-btn"
            onClick={ () => setDoneList(listCart.filter((a) => a.type === 'bebida')) }
          />
          Drinks
        </label>
        { filteredDoneList.map((card, index) => (
          <Card
            key={ card.id }
            id={ card.id }
            index={ index }
            name={ card.name }
            thumbnail={ card.image }
            isFood={ card.type === 'comida' }
            cat={ card.category }
            doneDate={ card.doneDate }
            tags={ card.tags }
            area={ card.area }
            alcoholic={ card.alcoholicOrNot }
          />
        ))}

      </div>
    );
  } if (path === '/receitas-favoritas') {
    return (
      <div>
        <Header title="Receitas Favoritas" showSearchButton={ false } />
        <label htmlFor="All">
          <input
            type="radio"
            name="filter"
            value="All"
            id="All"
            data-testid="filter-by-all-btn"
            onClick={ () => setFavList(listFavCart) }
          />
          All
        </label>
        <label htmlFor="Food">
          <input
            type="radio"
            name="filter"
            value="Food"
            id="Food"
            data-testid="filter-by-food-btn"
            onClick={
              () => setFavList(listFavCart.filter((a) => a.type === 'comida'))
            }
          />
          Food
        </label>
        <label htmlFor="Drinks">
          <input
            type="radio"
            name="filter"
            value="Drinks"
            id="Drinks"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFavList(listFavCart.filter((a) => a.type === 'bebida')) }
          />
          Drinks
        </label>
        { FList.map((card, index) => (
          <Card
            key={ card.id }
            id={ card.id }
            tags={ card.tags }
            area={ card.area }
            index={ index }
            cat={ card.category }
            alcoholic={ card.alcoholicOrNot }
            name={ card.name }
            thumbnail={ card.image }
            isFood={ card.type === 'comida' }
            unfavRecipe={ unfavRecipe }
          />
        ))}

      </div>
    );
  }
}
