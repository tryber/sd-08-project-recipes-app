import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveDoneRecipes } from '../services/API';
// import copy from 'clipboard-copy';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
// import shareIcon from '../images/shareIcon.svg';
import CardReceitasFeitas from '../components/CardReceitasFeitas';

function ReceitasFeitas() {
  const [recipes, setRecipes] = useState();
  // const [toRender, setToRender] = useState(false);
  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);
  // const shareClicker = (type, id) => {
  //   setRender(true);
  //   return copy(`http://localhost:3000/${type}s/${id}`);
  // };
  const filterFood = () => {
    const foods = saveDoneRecipes().filter((recipe) => recipe.type === 'comida');
    setRecipes(foods);
  };
  const filterDrink = () => {
    const drinks = saveDoneRecipes().filter((recipe) => recipe.type === 'bebida');
    setRecipes(drinks);
  };
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </header>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setRecipes(
            JSON.parse(localStorage.getItem('doneRecipes')),
          ) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filterFood() }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterDrink() }
        >
          Drink
        </button>
      </div>
      {
        recipes
          && recipes.map((recipe, index) => (
            <CardReceitasFeitas key={ index } recipe={ recipe } i={ index } />
          ))
      }
      <Footer />
    </div>
  );
}
export default ReceitasFeitas;
