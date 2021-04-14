import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderPS from '../components/HeaderPS';
import { fetchListByFilter, fetchRecipeByArea } from '../services/RequisicaoApi';

import '../styles/OrigemComidas.css';

const TWELVE_RECIPES = 12;

function OrigemComidas() {
  const [areasApi, setAreasApi] = useState(null);
  const [activeArea, setActiveArea] = useState('American');
  const [redirect, setRedirect] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [recipes, setRecipes] = useState(null);

  async function getAreasApi() {
    setAreasApi(await fetchListByFilter('themealdb', 'a'));
  }

  function handleClick(e) {
    setSelectedRecipe(e.currentTarget.id);
    setRedirect(true);
  }

  async function getRecipes() {
    setRecipes(await fetchRecipeByArea(activeArea));
  }

  useEffect(() => {
    getRecipes();
  }, [activeArea]);

  useEffect(() => {
    getAreasApi();
  }, []);

  if (redirect) return <Redirect to={ `/comidas/${selectedRecipe}` } />;

  return (
    <>
      <HeaderPS title="Explorar Origem" endpoint="themealdb" />
      <main className="area-main-container">
        <label htmlFor="area-dropdown">
          <select
            data-testid="explore-by-area-dropdown"
            id="area-dropdown"
            onChange={ (e) => setActiveArea(e.target.value) }
            value={ activeArea }
          >
            <option data-testid="All-option">All</option>
            {areasApi && areasApi.meals.map((area) => (
              <option
                data-testid={ `${area.strArea}-option` }
                key={ area.strArea }
                value={ area.strArea }
              >
                { area.strArea }
              </option>
            ))}
          </select>
        </label>
        <div className="recipes-container">
          { recipes && (
            recipes.meals.slice(0, TWELVE_RECIPES).map((recipe, index) => (
              <button
                className="recipe-card"
                data-testid={ `${index}-recipe-card` }
                id={ recipe.idMeal }
                key={ index }
                onClick={ handleClick }
                type="button"
              >
                <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
                <img
                  alt="ingredient"
                  className="recipe-img"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                />
              </button>
            )))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default OrigemComidas;
