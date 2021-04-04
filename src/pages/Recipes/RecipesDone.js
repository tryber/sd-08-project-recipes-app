import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipesDone() {
  const storedDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [copied, setCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState(storedDone);

  const filterRecipes = (filter) => {
    const filtered = !filter
      ? storedDone
      : storedDone.filter((recipe) => filter === recipe.type);
    setDoneRecipes(filtered);
  };

  const copyLink = (eachRecipe) => {
    copy(`http://localhost:3000/${eachRecipe.type}s/${eachRecipe.id}`);
    setCopied(true);
  };

  return (
    <>
      <Header pageTitle="Receitas Feitas" showSearchButton={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </div>
      <div>
        {doneRecipes.map((eachRecipe, index) => (
          <div key={ eachRecipe.id }>
            <Link to={ `/${eachRecipe.type}s/${eachRecipe.id}` }>
              <img
                style={ { width: '100vw' } }
                src={ eachRecipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ eachRecipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {eachRecipe.type === 'comida'
                ? `${eachRecipe.area} - ${eachRecipe.category}`
                : `${eachRecipe.alcoholicOrNot}`}
            </p>
            <Link
              to={ `/${eachRecipe.type}s/${eachRecipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {eachRecipe.name}
            </Link>
            <button type="button" onClick={ () => copyLink(eachRecipe) }>
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Share Button"
              />
              {copied && <p>Link copiado!</p>}
            </button>
            <p data-testid={ `${index}-horizontal-done-date` }>{eachRecipe.doneDate}</p>
            {eachRecipe.tags.map((eachTag) => (
              <span key={ eachTag } data-testid={ `${index}-${eachTag}-horizontal-tag` }>
                {eachTag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
