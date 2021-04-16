import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../common/svgStore';
import { setFavoriteRecipes } from '../services/setLocalStorage';
import { getHeartType } from '../services/getLocalStorage';

const HeaderRecipeDetails = ({
  imgPath,
  title,
  category,
  page,
  id,
  area,
  drinkCategory,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
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
    setShouldUpdate(!shouldUpdate);
  };

  return (
    <section className="header-recipe-detail">
      <img
        src={ imgPath }
        alt="recipe"
        className="image-details"
        data-testid="recipe-photo"
      />
      <section className="detail-section">
        <h3 data-testid="recipe-title">{title}</h3>
        <h5 data-testid="recipe-category">{category}</h5>
        <div>
          <CopyToClipboard
            text={ `http://localhost:3000/${page}/${id}` }
            onCopy={ handleClick }
          >
            <input
              className="share-btn"
              type="image"
              src={ shareIcon }
              alt="share icon"
              data-testid="share-btn"
            />
          </CopyToClipboard>
          <input
            className="favorite-btn"
            type="image"
            src={ getHeartType(id) ? blackHeartIcon : whiteHeartIcon }
            alt="white heart icon"
            data-testid="favorite-btn"
            onClick={ handleClickHeart }
          />
        </div>
      </section>
      {isCopied ? <p className="copied-msg">Link copiado!</p> : ''}
    </section>
  );
};

HeaderRecipeDetails.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  drinkCategory: PropTypes.string.isRequired,
};

export default HeaderRecipeDetails;
