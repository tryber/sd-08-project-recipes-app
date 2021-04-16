import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import HeartIcon from '../images/blackHeartIcon.svg';

export default function CardFavorites(
  { img, id, type, index, removeFavorite, alt, title, desc },
) {
  const [copyLink, setCopyLink] = useState(false);

  const copyLinkFn = () => {
    setCopyLink(true);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ img }
          alt={ alt }
        />
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>{desc}</p>
        <Link to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{title}</h4>
        </Link>
        <div>
          <button type="button" onClick={ () => copyLinkFn() }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
            {copyLink && 'Link copiado!' }
          </button>
          <button
            type="button"
            onClick={ () => removeFavorite(index, id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ HeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

CardFavorites.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
