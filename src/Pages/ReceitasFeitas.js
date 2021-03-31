import React, { useState } from 'react';
import CardFeitas from '../components/CardFeitas';
import Header from '../components/Header';

import '../styles/ReceitasFeitas.css';

function ReceitasFeitas() {
  const [filterType, setFilterType] = useState('All');

  const verify = () => {
    let filtered = [];
    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (filterType !== 'All') {
        filtered = doneRecipes.filter((elem) => elem.type === filterType);
      } else {
        filtered = doneRecipes;
      }
      return (
        filtered.map((elem, index) => (
          <CardFeitas key={ index } objDetail={ elem } index={ index } />
        ))
      );
    }
    return <span>Você não tem receitas feitas</span>;
  };

  const handleClick = (type) => {
    setFilterType(type);
  };

  return (
    <div className="done-recipes-body">
      <Header title="Receitas Feitas" search={ false } />
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
      {verify()}

    </div>
  );
}

export default ReceitasFeitas;
