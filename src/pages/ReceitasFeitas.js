import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import HeaderP from '../components/HeaderP';
import shareIcon from '../images/shareIcon.svg';

import '../styles/ReceitasFeitas.css';

function ReceitasFeitas() {
  const [recipesCompleted, setRecipesCompleted] = useState('All');
  const [filterRecipesCompleted, setFilterRecipesCompleted] = useState([]);
  const [copyURL, setCopyURL] = useState(false);

  const updateRecipesCompleted = () => {
    const loadDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log(loadDoneRecipes);
    switch (recipesCompleted) {
    case 'All':
      return loadDoneRecipes;
    case 'Food':
      return loadDoneRecipes.filter((recipes) => recipes.type === 'comida');
    case 'Drinks':
      return loadDoneRecipes.filter((recipes) => recipes.type === 'bebida');
    default:
      console.log('Selecione uma categoria');
    }
  };

  const changeFilter = (value) => {
    // console.log(value);
    if (value === recipesCompleted) setRecipesCompleted('All');
    else setRecipesCompleted(value);
  };

  useEffect(() => {
    setFilterRecipesCompleted(updateRecipesCompleted());
  }, [recipesCompleted]);

  const shareBtn = (type, id) => {
    copy(window.location.href
      .replace('receitas-feitas', '')
      .concat(`${type}s/${id}`));
    setCopyURL(true);
  };

  return (
    <div>
      <HeaderP title="Receitas Feitas" />
      <hr />
      <div className="btns-recipes-completed">
        <button
          type="button"
          value="All"
          onClick={ (event) => changeFilter(event.target.value) }
          data-testid="filter-by-all-btn"
          className="btn-recipes-completed"
        >
          All
        </button>
        <button
          type="button"
          value="Food"
          onClick={ (event) => changeFilter(event.target.value) }
          data-testid="filter-by-food-btn"
          className="btn-recipes-completed"
        >
          Food
        </button>
        <button
          type="button"
          value="Drinks"
          onClick={ (event) => changeFilter(event.target.value) }
          data-testid="filter-by-drink-btn"
          className="btn-recipes-completed"
        >
          Drinks
        </button>
      </div>
      <br />
      <br />
      <div className="container-done-recipes">
        { filterRecipesCompleted && (
          filterRecipesCompleted.map((recipe, index) => (
            <div
              className="done-recipes-one"
              key={ `${index}` }
            >
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  className="recipe-horizontal-image"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="done-recipes-two">
                {
                  recipe.type === 'comida' ? (
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${recipe.area} - ${recipe.category}` }
                    </span>
                  ) : (
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { recipe.alcoholicOrNot }
                    </span>
                  )
                }
                <div>
                  <Link to={ `${recipe.type}s/${recipe.id}` }>
                    <span
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { recipe.name }
                    </span>
                  </Link>
                </div>
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Feita em: ${recipe.doneDate}` }
                </span>
                {
                  recipe.tags && (
                    recipe.tags.map((tag) => (
                      <span
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </span>
                    ))
                  )
                }
              </div>
              <div>
                <input
                  type="image"
                  alt="Share image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  className="share-btn done-recipe"
                  id="share-btn"
                  src={ shareIcon }
                  onClick={ () => shareBtn(recipe.type, recipe.id) }
                />
              </div>
              { copyURL ? <p>Link copiado!</p> : null }
              {/* <small style={ { visibility: copyClipboard } }>Link copiado!</small> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
