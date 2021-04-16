import React, { useState } from 'react';
import HeaderSimple from '../components/HeaderSimple';
import NavBarDoneRecipe from '../components/NavBarDoneRecipe';
import CardDoneRecipe from '../components/CardDoneRecipe';
import './RecipesDone.css';

function RecipesDone() {
  const [filter, setFilter] = useState('all');

  const onClickTypeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <main>
      <header>
        <HeaderSimple />
      </header>
      <section className="main-content-recipe-done">
        <NavBarDoneRecipe onClickTypeFilter={ onClickTypeFilter } />
        <CardDoneRecipe typeFilter={ filter } />
      </section>
    </main>
  );
}

export default RecipesDone;
