import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../../component/Header';
import shareIcon from '../../images/shareIcon.svg';
import StyledDone from '../../styles/RecipesDone';

const LINK_COPIED_TIMEOUT = 2000;

export default function RecipesDone() {
  const storedDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [copied, setCopied] = useState(storedDone.map(() => false));
  const [doneRecipes, setDoneRecipes] = useState(storedDone);
  const history = useHistory();

  const filterRecipes = (filter) => {
    const filtered = !filter
      ? storedDone
      : storedDone.filter((recipe) => filter === recipe.type);
    setDoneRecipes(filtered);
  };

  const copyLink = (eachRecipe, index) => {
    const { type, id } = eachRecipe;
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(copied.map((_each, i) => i === index));
    setTimeout(() => setCopied(copied.map(() => false)), LINK_COPIED_TIMEOUT);
  };

  const goToLink = (type, id) => history.push(`/${type}s/${id}`);

  return (
    <StyledDone>
      <Header pageTitle="Receitas Feitas" showSearchButton={ false } />

      <div className="filter-buttons">
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

      <div className="done-recipes-container">
        {doneRecipes.map((eachRecipe, index) => (
          <div key={ eachRecipe.id } className="recipe">
            <button
              type="button"
              onClick={ () => goToLink(eachRecipe.type, eachRecipe.id) }
              className="recipe-image-container"
            >
              <img
                src={ eachRecipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ eachRecipe.name }
              />
            </button>

            <div className="recipe-data">
              <p data-testid={ `${index}-horizontal-top-text` }>
                {eachRecipe.type === 'comida'
                  ? `${eachRecipe.area} - ${eachRecipe.category}`
                  : `${eachRecipe.alcoholicOrNot}`}
              </p>
              <button
                type="button"
                onClick={ () => goToLink(eachRecipe.type, eachRecipe.id) }
                data-testid={ `${index}-horizontal-name` }
                className="recipe-name"
              >
                {eachRecipe.name}
              </button>

              <button
                type="button"
                onClick={ () => copyLink(eachRecipe, index) }
                className="share-btn"
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Share Button"
                />
                {copied[index] && <span>Link copiado!</span>}
              </button>

              <p data-testid={ `${index}-horizontal-done-date` }>{eachRecipe.doneDate}</p>
              <div className="recipe-tags">
                {eachRecipe.tags.map((eachTag) => (
                  <span
                    key={ eachTag }
                    data-testid={ `${index}-${eachTag}-horizontal-tag` }
                  >
                    {eachTag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledDone>
  );
}
