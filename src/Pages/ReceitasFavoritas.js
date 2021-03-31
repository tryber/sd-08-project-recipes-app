import React, { useContext, useEffect, useState } from 'react';
import CardFavoritas from '../components/CardFavoritas';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import getInformation from '../services/getInformation';

function ReceitasFavoritas() {
  const [filterType, setFilterType] = useState('All');
  const { receitasFav, setReceitasFav } = useContext(RecipeContext);

  const verify = () => {
    let filtered = [];
    const favoriteRecipes = receitasFav;
    if (filterType !== 'All') {
      filtered = favoriteRecipes.filter((elem) => elem.type === filterType);
    } else {
      filtered = favoriteRecipes;
    }
    return filtered;
  };

  const handleClick = (type) => {
    setFilterType(type);
  };

  useEffect(() => {
    getInformation(setReceitasFav);
  }, []);

  return (
    <div className="done-recipes-body">
      <Header title="Receitas Favoritas" search={ false } />
      <div className="background-color" />
      <div className="head">
        <div className="done-button-content">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => handleClick('All') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => handleClick('comida') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleClick('bebida') }

          >
            Drinks
          </button>
        </div>
      </div>
      {verify().map((elem, index) => (
        <CardFavoritas key={ index } objDetail={ elem } index={ index } />
      ))}
    </div>
  );
}

export default ReceitasFavoritas;
