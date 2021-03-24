// import React, { useState, useEffect } from 'react';
import React from 'react';
// import { NavLink } from 'react-router-dom';
import HeaderP from '../components/HeaderP';
// import { loadState } from '../services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';

import '../styles/ReceitasFeitas.css';

function ReceitasFeitas() {
  // const [recipesCompleted, setRecipesCompleted] = useState('All');
  // const [filterRecipesCompleted, setFilterRecipesCompleted] = useState([]);

  // const updateRecipesCompleted = () => {
  //   const loadDoneRecipes = loadState('doneRecipes', []);
  //   switch (recipesCompleted) {
  //   case 'All':
  //     return loadDoneRecipes;
  //   case 'Food':
  //     return loadDoneRecipes.filter((recipe) => recipe.type === 'comida');
  //   case 'Drinks':
  //     return loadDoneRecipes.filter((recipe) => recipe.type === 'bebida');
  //   default:
  //     console.log('');
  //   }
  // };

  // useEffect(() => {
  //   setFilterRecipesCompleted(updateRecipesCompleted());
  // }, [recipesCompleted]);

  const changeFilter = (value) => {
    console.log(value);
    // if (value === recipesCompleted) setRecipesCompleted('All');
    // else setRecipesCompleted(value);
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
      <p data-testid="0-horizontal-top-text">Top Text 0</p>
      <p data-testid="1-horizontal-top-text">Top Text 1</p>
      <p data-testid="0-horizontal-done-date">Done Date</p>
      <p data-testid="0-Curry-horizontal-tag">CurryTag</p>
      <p data-testid="0-Pasta-horizontal-tag">PastaTag</p>
      <div>
        <img
          src="{ recipe.image }"
          alt="{ recipe.name }"
          data-testid="0-horizontal-image"
        />
        <img
          src="{ recipe.image }"
          alt="{ recipe.name }"
          data-testid="1-horizontal-image"
        />
        <img
          src={ shareIcon }
          alt="Share Recipe"
          data-testid="0-horizontal-share-btn"
        />
        <img
          src={ shareIcon }
          alt="Share Recipe"
          data-testid="1-horizontal-share-btn"
        />
        <span
          data-testid="0-horizontal-name"
        >
          Name0
        </span>
        <span
          data-testid="1-horizontal-name"
        >
          Name1
        </span>
      </div>
      <div>
        {/* {
          filterRecipesCompleted.map((recipe, index) => (
            <div
              key={ index }
            >
              <div>
                <NavLink to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </NavLink>
              </div>
              <div>
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
                  <NavLink to={ `${recipe.type}s/${recipe.id}` }>
                    <span
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { recipe.name }
                    </span>
                  </NavLink>
                </div>
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Feita em: ${recipe.doneDate}` }
                </span>
                <span
                  key={ recipe.tag }
                  data-testid={ `${index}-${recipe.tag}-horizontal-tag` }
                >
                  { recipe.tag }
                </span>
              </div>
              <div>
                <img
                  src={ shareIcon }
                  alt="Share Recipe"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </div>
            </div>
          ))
        } */}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
