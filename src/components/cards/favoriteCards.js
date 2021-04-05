import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from '../Buttons/FavoriteButton';
import ShareButton from '../Buttons/ShareButton';

function FavoriteRecipesCard({ favorite, index }) {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const { id, type, name, category, area, image, alcoholicOrNot } = favorite;

  const categoryId = `${index}-horizontal-top-text`;
  const imageId = `${index}-horizontal-image`;
  const nameId = `${index}-horizontal-name`;
  const shareButtonId = `${index}-horizontal-share-btn`;
  const favoriteButtonId = `${index}-horizontal-favorite-btn`;
  const path = `/${type}s/${id}`;

  return (
    <section key={ id } className="doneCard">
      <Link to={ path }>
        <img data-testid={ imageId } className="recipeImage" src={ image } alt={ name } />
      </Link>
      <section>
        <Link to={ path }>
          <h2 data-testid={ nameId }>{ name }</h2>
        </Link>
        {(type === 'bebida')
          ? (<h2 data-testid={ categoryId }>{ alcoholicOrNot }</h2>)
          : (<h2 data-testid={ categoryId }>{ `${area} - ${category}` }</h2>) }

        { isCopiedLink && <span>Link copiado!</span> }
      </section>
      <ShareButton
        recipeId={ id }
        recipeType={ type }
        testid={ shareButtonId }
        onClick={ setIsCopiedLink }
      />
      <FavoriteButton recipeId={ id } testid={ favoriteButtonId } />
    </section>);
}

FavoriteRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  favorite: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipesCard;
