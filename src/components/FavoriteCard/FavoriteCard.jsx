import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './styles.css';

const THREE_SECONDS = 3000;
const copy = require('clipboard-copy');

const FavoriteCard = ({ handleFavorite, index, recipe }) => {
  const [message, setMessage] = useState(false);
  const [timeID, setTimeId] = useState(null);
  const { image, name, area, category, alcoholicOrNot, type, id } = recipe;

  useEffect(() => {
    if (message === true) {
      setTimeId(setTimeout(setMessage, THREE_SECONDS, false));
    }
  }, [message, setMessage]);

  useEffect(() => {
    if (timeID !== null) return () => clearTimeout(timeID);
  });

  const handleShare = async () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setMessage(true);
  };

  return (
    <div className="card-container">
      {
        message
          ? (
            <div className="message" style={ { display: message ? 'flex' : 'none' } }>
              <p>Link copiado!</p>
            </div>
          ) : null
      }
      <div className="title-details-container">
        <Link to={ `/${type}s/${id}` }>
          <div className="image-container">
            <img
              className="image-favorites"
              src={ image }
              alt={ `${type} ${name}` }
              data-testid={ `${index}-horizontal-image` }
            />
          </div>
        </Link>
        <div className="content-card-favorite">
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {
              type === 'comida' ? `${area} - ${category}` : alcoholicOrNot
            }
          </p>
          <Link to={ `/${type}s/${id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
          </Link>
        </div>
        <div className="share-like share-favorite-container">
          <button
            className="share-favorite-buttons"
            type="button"
            onClick={ handleShare }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share button"
            />
          </button>
          <button
            className="share-favorite-buttons"
            type="button"
            onClick={ (event) => handleFavorite(event) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              name={ name }
              src={ blackHeartIcon }
              alt="favorite button"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

FavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default FavoriteCard;
