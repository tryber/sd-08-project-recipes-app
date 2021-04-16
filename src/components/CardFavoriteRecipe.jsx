import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../common/svgStore';
import { setFavoriteRecipes } from '../services/setLocalStorage';
import { getHeartType } from '../services/getLocalStorage';

const CardFavoritRecipe = ({
  imgPath,
  title,
  category,
  page,
  id,
  area,
  drinkCategory,
  index,
  callback,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const toFavorite = {
    id,
    type: page,
    area,
    category,
    alcoholicOrNot: drinkCategory,
    name: title,
    image: imgPath,
  };

  const twoSecond = 2000;
  const handleClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, twoSecond);
  };

  const handleClickHeart = () => {
    setFavoriteRecipes(toFavorite);
    setIsCopied(!isCopied);
    callback();
  };
  return (
    <section className="favorite-recipe">
      <Link key={ id } to={ `/${page}/${id}` }>
        <img
          src={ imgPath }
          alt="recipe"
          className="image-details"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link key={ id } to={ `/${page}/${id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>{title}</h3>
      </Link>
      <h5 data-testid={ `${index}-horizontal-top-text` }>
        {`${area} - ${category}`}
      </h5>
      <section className="btn-favorite-share">
        <CopyToClipboard
          text={ `http://localhost:3000/${page}/${id}` }
          onCopy={ handleClick }
        >
          <input
            type="image"
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </CopyToClipboard>
        <input
          type="image"
          src={ getHeartType(id) ? blackHeartIcon : whiteHeartIcon }
          alt="white heart icon"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ handleClickHeart }
        />
      </section>
      {isCopied ? <p>Link copiado!</p> : ''}
    </section>
  );
};

CardFavoritRecipe.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  drinkCategory: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CardFavoritRecipe;
