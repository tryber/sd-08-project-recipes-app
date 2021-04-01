import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './recipesFavDone.css';
import CardRecipe from '../../components/CardRecipe/CardRecipe';

const RecipesFavDone = ({ title, visible }) => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const localRecipes = localStorage.getItem('doneRecipes');
    setDoneRecipes(JSON.parse(localRecipes));
  }, []);
  return (
    <div>
      <Header title={title} visible={visible} />
      <div
        className="btn-group btn-filters"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          className="btn btn-info"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-info"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="btn btn-info"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {doneRecipes.length > 0 &&
        doneRecipes.map((recipe, index) => (
          <CardRecipe
            key={index}
            id={recipe.id}
            type={recipe.type}
            index={index}
            image={recipe.image}
            alcoholicOrNot={recipe.alcoholicOrNot}
            area={recipe.area}
            category={recipe.category}
            name={recipe.name}
            doneDate={recipe.doneDate}
            tags={recipe.tags}
          />
        ))}
    </div>
  );
};

RecipesFavDone.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default RecipesFavDone;
