import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterTypeBtn from '../components/FilterTypeBtn';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../CSS/ProfilePage.css';

function getTags({ tags }, index) {
  if (!tags) return null;
  if (tags) {
    return (
      <>
        { tags.map((e) => (
          <span
            key={ `${index}${e}` }
            data-testid={ `${index}-${e}-horizontal-tag` }
          >
            { e }
          </span>
        ))}
      </>
    );
  }
}

function FinishedRecipes() {
  const finishedRecipesStorage = (localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];
  const [filterSelector, setFilterSelector] = useState('all');

  function handleSelector({ target }) {
    setFilterSelector(target.value);
  }

  function generateCard(recipe, index) {
    return (
      <section key={ recipe.id } className="done-section">
        <div className="info-recipe-done">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className="card-done-img"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div className="info-text-done">
            <span data-testid={ `${index}-horizontal-top-text` }>
              { (recipe.area)
                ? `${recipe.area} - ${recipe.category}` : `${recipe.category}` }
              { (recipe.alcoholicOrNot) && <span>{ recipe.alcoholicOrNot }</span> }
            </span>
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Feita em: ${recipe.doneDate} ` }
            </span>
            { getTags(recipe, index) }
          </div>
          <ShareButton
            dataTestId={ `${index}-horizontal-share-btn` }
            recipeId={ recipe.id }
            recipeType={ recipe.type }
          />
        </div>
        <div className="title-recipe-done">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
          </Link>
        </div>
      </section>
    );
  }

  function generateListOfCards() {
    if (finishedRecipesStorage.length === 0) {
      return (
        <div className="user-title no-recipe">No done recipes yet!</div>
      );
    }
    if (filterSelector === 'all' && finishedRecipesStorage) {
      return (
        <div>
          { finishedRecipesStorage.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'food' && finishedRecipesStorage) {
      const filteredRecipes = finishedRecipesStorage
        .filter((elem) => elem.type === 'comida');
      return (
        <div>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'drinks' && finishedRecipesStorage) {
      const filteredRecipes = finishedRecipesStorage
        .filter((elem) => elem.type === 'bebida');
      return (
        <div>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
  }

  return (
    <section className="profile-page-img main-container">
      <section className="profile-header-section">
        <Header />
        <FilterTypeBtn handleSelector={ handleSelector } />
      </section>
      { generateListOfCards() }
    </section>
  );
}

export default FinishedRecipes;
