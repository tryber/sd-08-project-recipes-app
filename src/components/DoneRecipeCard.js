import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BigCard from './BigCard';
import BigCardHeader from './BigCardHeader';
import BigCardTag from './BigCardTag';

const DoneRecipeCard = ({ recipe, index }) => {
  function renderImage() {
    return (
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
    );
  }

  function renderInfo() {
    return (
      <>
        <BigCardHeader
          recipe={ recipe }
          index={ index }
          showShare
        />
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Feita em: ${recipe.doneDate}` }
        </p>
        <div>
          { recipe.tags.map((tag, tagIndex) => (
            <BigCardTag
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tagIndex }
              tag={ tag }
            />)) }
        </div>
      </>
    );
  }

  return (
    <BigCard
      image={ renderImage() }
      info={ renderInfo() }
    />
  );
};

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
