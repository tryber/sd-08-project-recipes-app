import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../../component/Header';
import shareIcon from '../../images/shareIcon.svg';
import StyledProfile from '../../styles/RecipesDone';

export default function RecipesDone() {
  const storedDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [copied, setCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState(storedDone);
  const history = useHistory();

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

  const goToLink = (type, id) => history.push(`/${type}s/${id}`);

  return (
    <StyledProfile>
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

              <button type="button" onClick={ () => copyLink(eachRecipe) }>
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Share Button"
                />
                {copied && <p>Link copiado!</p>}
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
    </StyledProfile>
  );
}
