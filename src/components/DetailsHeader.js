import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetails.css';

function DetailsHeader({ recipeType, recipe }) {
  const {
    copyURL,
    setCopyURL,
  } = useContext(Context);

  function shareLink() {
    copy((window.location.href).replace('/in-progress', ''));
    setCopyURL(true);
    // https://github.com/feross/clipboard-copy
  }

  function favoriteRecipe() {
    const id = recipe[`id${recipeType}`];
    const type = recipeType === 'Meal' ? 'comida' : 'bebida';
    const area = recipe.strArea ? recipe.strArea : '';
    const category = recipe.strCategory;
    const alcoholicOrNot = recipe.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : '';
    const name = recipe[`str${recipeType}`];
    const image = recipe[`str${recipeType}Thumb`];

    const newFavorite = { id, type, area, category, alcoholicOrNot, name, image };

    let favoritesArray = [];
    favoritesArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (favoritesArray.some((item) => item.id === id)) {
      console.log('repeteco');
      favoritesArray = favoritesArray.filter((item) => item.id !== id);
      document.getElementById('favorite-btn').setAttribute('src', whiteHeartIcon);
    } else {
      favoritesArray.push(newFavorite);
      console.log('sou novo aqui');
      document.getElementById('favorite-btn').setAttribute('src', blackHeartIcon);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesArray));
  }

  return (
    <section>
      <img
        alt="Recipe thumbnail"
        data-testid="recipe-photo"
        src={ recipe[`str${recipeType}Thumb`] }
        height="100"
      />
      <h1 data-testid="recipe-title">
        { recipe[`str${recipeType}`] }
      </h1>
      <input
        type="image"
        alt="Share image"
        data-testid="share-btn"
        className="share-btn"
        id="share-btn"
        src={ shareIcon }
        onClick={ () => shareLink() }
      />
      <input
        type="image"
        alt="Favorite image"
        data-testid="favorite-btn"
        className="favorite-btn"
        id="favorite-btn"
        src={ localStorage.getItem('favoriteRecipes')
            && JSON.parse(localStorage.getItem('favoriteRecipes'))
              .some((item) => item.id === recipe[`id${recipeType}`])
          ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => favoriteRecipe() }
      />
      { copyURL ? <p>Link copiado!</p> : null }
      <h5 data-testid="recipe-category">
        { recipe.strCategory }
        {recipeType === 'Drink' ? recipe.strAlcoholic : null}
      </h5>
    </section>
  );
}

DetailsHeader.propTypes = {
  recipeType: PropTypes.string,
  recipe: {
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
  },
}.isRequired;

export default DetailsHeader;
