import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../Buttons/ShareButton';

function DoneRecipeCard({ index, recipe }) {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const {
    alcoholicOrNot,
    area,
    category,
    doneDate,
    id,
    image,
    name,
    tags,
    type,
  } = recipe;

  const categoryId = `${index}-horizontal-top-text`;
  const doneDateId = `${index}-horizontal-done-date`;
  const imageId = `${index}-horizontal-image`;
  const nameId = `${index}-horizontal-name`;
  const shareButtonId = `${index}-horizontal-share-btn`;
  const path = `/${type}s/${id}`;

  function showTags() {
    if (!tags) return;
    let tagsToShow;

    if (typeof tags === 'string') {
      tagsToShow = tags.split(',');
    } else {
      tagsToShow = [...tags];
    }

    if (tagsToShow.length > 2) {
      tagsToShow = tagsToShow.slice(0, 2);
    }

    return (
      <div>
        {
          tagsToShow.map((tag) => {
            const tagId = `${index}-${tag}-horizontal-tag`;
            return <span key={ tagId } data-testid={ tagId }>{ tag }</span>;
          })
        }
      </div>
    );
  }

  function mealFeature() {
    return (
      <span data-testid={ categoryId }>{ `${area} - ${category}` }</span>
    );
  }

  function drinkFeature() {
    return <span data-testid={ categoryId }>{ alcoholicOrNot }</span>;
  }

  return (
    <section className="doneCard">
      <Link to={ path } className="recipeImage">
        <img
          src={ image }
          alt={ name }
          data-testid={ imageId }
        />
      </Link>
      <section className="recipeInfo">
        <div>
          { type === 'comida' ? mealFeature() : drinkFeature() }
          <ShareButton
            recipeId={ id }
            recipeType={ type }
            testid={ shareButtonId }
            onClick={ setIsCopiedLink }
          />
          { isCopiedLink && <span>Link copiado!</span> }
        </div>
        <Link to={ path }>
          <h3 data-testid={ nameId }>{ name }</h3>
        </Link>
        { 'Feita em: ' }
        <span data-testid={ doneDateId }>{ doneDate }</span>
        { type === 'comida' && showTags() }
      </section>
    </section>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default DoneRecipeCard;
