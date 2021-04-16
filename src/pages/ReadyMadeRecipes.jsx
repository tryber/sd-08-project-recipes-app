import React, { useState } from 'react';
import CategoriesContainer from '../components/CategoriesContainer';
import ContainerDoneRecipes from '../components/ContainerDoneRecipes';
import Header from '../components/Header';
import { getDoneRecipes } from '../services/getLocalStorage';

function ReadyMadeRecipes() {
  const doneRecipes = getDoneRecipes();
  const [actualFilter, setActualFilter] = useState('All');

  const handleClickFilter = (type) => {
    setActualFilter(type);
  };

  const showCards = () => {
    let recipes = [];
    if (actualFilter === 'All') {
      recipes = doneRecipes;
    } else if (actualFilter === 'Drink') {
      recipes = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    } else if (actualFilter === 'Food') {
      recipes = doneRecipes.filter((recipe) => recipe.type === 'comida');
    }
    return recipes.map((doneRecipe, index) => (
      <ContainerDoneRecipes
        key={ doneRecipe.id }
        info={ doneRecipe }
        index={ index }
      />
    ));
  };

  return (
    <section>
      <Header label="Receitas Feitas" Search={ () => '' } />
      <br />
      <br />
      <br />
      <CategoriesContainer page="Favoritas" callback={ handleClickFilter } />
      <section className="cards-favorites">{showCards()}</section>
    </section>
  );
}

export default ReadyMadeRecipes;
