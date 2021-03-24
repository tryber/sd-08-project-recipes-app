import React, { useState } from 'react';
import { useHistory } from 'react-router';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import data from './data';

const copy = require('clipboard-copy');

const DrinkRecipeTop = () => {
  const recipe = [data[1]];
  const history = useHistory();
  const [copied, setCopy] = useState(false);
  console.log(recipe);
  const copyToClipBoard = (url) => {
    const rootUrl = url.replace('/in-progress', '');
    copy(`http://localhost:3000${rootUrl}`)
      .then(() => {
        console.log('Copy OK!');
        setCopy(true);
      });
  };
  return (
    <div>
      <div>
        <img
          src={ recipe[0].strMealThumb }
          alt={ recipe[0].strMealThumb }
          data-testid="recipe-photo"
        />
      </div>
      <div>
        <div>
          <h3 data-testid="recipe-title">{recipe[0].strMeal}</h3>
          <p data-testid="recipe-category">{recipe[0].strCategory}</p>
        </div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyToClipBoard(history.location.pathname) }
          >
            <img src={ shareIcon } alt={ shareIcon } />
          </button>
          {copied && <p>Link copiado!</p>}
          <button type="button" data-testid="favorite-btn">
            <img src={ whiteHeartIcon } alt={ whiteHeartIcon } />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkRecipeTop;
