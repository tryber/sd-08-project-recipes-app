import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const CardReceitasFeitas = (props) => {
  const { recipe, i } = props;
  const [render, setRender] = useState(false);
  const shareClicker = (type, id) => {
    setRender(true);
    return copy(`http://localhost:3000/${type}s/${id}`);
  };
  return (
    <div>
      <div i={ recipe.id }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            style={ { width: '300px' } }
            data-testid={ `${i}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${i}-horizontal-name` }>{recipe.name}</p>
        </Link>
        <p data-testid={ `${i}-horizontal-top-text` }>
          {(recipe.type === 'comida')
            ? `${recipe.area} - ${recipe.category}`
            : recipe.alcoholicOrNot }
        </p>
        <p data-testid={ `${i}-horizontal-done-date` }>{recipe.doneDate}</p>
        {
          recipe.tags.map((tag) => (
            <div key={ recipe.id } data-testid={ `${i}-${tag}-horizontal-tag` }>
              <h4>{tag}</h4>
            </div>))
        }
        <button
          onClick={ () => shareClicker(recipe.type, recipe.id) }
          type="button"
          id={ `${i}-horizontal-share-btn` }
        >
          <img
            data-testid={ `${i}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share icon"
          />
          {render ? 'Link copiado!' : 'Compartilhar'}
        </button>
      </div>
    </div>);
};

CardReceitasFeitas.propTypes = {
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
  i: PropTypes.number.isRequired,
};

export default CardReceitasFeitas;
