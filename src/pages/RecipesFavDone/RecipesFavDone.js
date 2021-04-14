import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './recipesFavDone.css';
import CardRecipe from '../../components/CardRecipe/CardRecipe';
import { useHistory } from 'react-router';
import Context from '../../contextApi/Context';

const RecipesFavDone = ({ title, visible }) => {
  const history = useHistory();
  const { favoriteRecipes, setFavoriteRecipes } = useContext(Context);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(localDone);
    setFavoriteRecipes(localFavorite);
  }, []);

  const filterBy = (type) => {
    if (localStorage.getItem('doneRecipes') && title === 'Receitas Feitas') {
      if (type === 'food') {
        const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
        const filterFood = getRecipes.filter(({ type }) => type === 'comida');
        setDoneRecipes(filterFood);
      } else if (type === 'drink') {
        const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
        const filterDrink = getRecipes.filter(({ type }) => type === 'bebida');
        setDoneRecipes(filterDrink);
      } else if (type === 'all') {
        const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
        setDoneRecipes(getRecipes);
      }
    }
    if (
      localStorage.getItem('favoriteRecipes') &&
      title === 'Receitas Favoritas'
    ) {
      if (type === 'food') {
        const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const filterFood = getRecipes.filter(({ type }) => type === 'comida');
        setFavoriteRecipes(filterFood);
      } else if (type === 'drink') {
        const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const filterDrink = getRecipes.filter(({ type }) => type === 'bebida');
        setFavoriteRecipes(filterDrink);
      } else if (type === 'all') {
        const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        setFavoriteRecipes(getRecipes);
      }
    }
  };

  const redirectTo = ({ target }, id, type) => {
    if (target.id === 'delete-doneRecipe') {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      const localProgress = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      const removeRecipe = localDone.filter(
        (recipe) => recipe.id !== target.value,
      );
      if (type === 'comida') {
        localProgress.meals[id] = [];
      } else {
        localProgress.cocktails[id] = [];
      }

      localStorage.setItem('doneRecipes', JSON.stringify(removeRecipe));
      localStorage.setItem('inProgressRecipes', JSON.stringify(localProgress));
      if (type === 'comida') {
        history.push(`/comidas/${target.value}/in-progress`);
      } else {
        history.push(`/bebidas/${target.value}/in-progress`);
      }
      return;
    }
    if (target.id !== 'btn-share') {
      if (type === 'comida') {
        history.push(`/comidas/${id}`);
      } else {
        history.push(`/bebidas/${id}`);
      }
    }
  };
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
          className="btn btn-danger"
          onClick={() => filterBy('all')}
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => filterBy('food')}
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => filterBy('drink')}
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {title === 'Receitas Feitas' &&
        doneRecipes.length > 0 &&
        doneRecipes.map((recipe, index) => (
          <button
            className="btn-recipes"
            key={index}
            onClick={(e) => redirectTo(e, recipe.id, recipe.type)}
          >
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
              btnRemake={true}
            />
          </button>
        ))}
      {title === 'Receitas Favoritas' &&
        favoriteRecipes.length > 0 &&
        favoriteRecipes.map((recipe, index) => (
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
            doneDate={null}
            tags={null}
            favorite={true}
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
