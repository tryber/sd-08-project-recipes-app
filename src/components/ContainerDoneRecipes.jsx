import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shareIcon } from '../common/svgStore';

const ContainerDoneRecipes = ({
  info: {
    id,
    type,
    area,
    category,
    name,
    image,
    doneDate,
    tags,
    alcoholicOrNot,
  },
  index,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const twoSecond = 2000;
  const handleClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, twoSecond);
  };

  const showTags = () => {
    if (tags.length === 0) {
      return '';
    }
    return tags.slice(0, 2).map((tag) => (
      <span
        className="tag-favorites"
        key={ tag }
        data-testid={ `${index}-${tag}-horizontal-tag` }
      >
        {tag}
      </span>
    ));
  };

  return (
    <section className="done-recipe">
      <Link to={ `/${type.concat('s')}/${id}` }>
        <img
          src={ image }
          alt="recipe"
          className="image-details"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type.concat('s')}/${id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </Link>
      {type === 'comida' ? (
        <h5 data-testid={ `${index}-horizontal-top-text` }>
          {`${area} - ${category}`}
        </h5>
      ) : (
        <h5 data-testid={ `${index}-horizontal-top-text` }>
          {`${alcoholicOrNot}`}
        </h5>
      )}
      <section className="share-btn-favorite">
        <h5 data-testid={ `${index}-horizontal-done-date` }>{doneDate}</h5>
        <CopyToClipboard
          text={ `http://localhost:3000/${type.concat('s')}/${id}` }
          onCopy={ handleClick }
        >
          <input
            type="image"
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </CopyToClipboard>
      </section>
      {isCopied ? <section>Link copiado!</section> : ''}
      <section>{showTags()}</section>
    </section>
  );
};

ContainerDoneRecipes.propTypes = {
  info: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ContainerDoneRecipes;
