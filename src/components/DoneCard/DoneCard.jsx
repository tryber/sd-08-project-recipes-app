import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import './styles.css';

const THREE_SECONDS = 3000;
const copy = require('clipboard-copy');

const DoneCard = ({ index, recipe }) => {
  const [message, setMessage] = useState(false);
  const [timeID, setTimeId] = useState(null);
  const {
    image,
    name,
    area,
    category,
    alcoholicOrNot,
    type,
    id,
    doneDate,
    tags,
  } = recipe;

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
      <Link to={ `/${type}s/${id}` }>
        <div className="image-container">
          <img
            style={ { width: '250px',
              height: '250px' } }
            src={ image }
            alt={ `${type} ${name}` }
            data-testid={ `${index}-horizontal-image` }
          />
        </div>
      </Link>
      <div className="content-card">
        <Link to={ `/${type}s/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {
            type === 'comida' ? `${area} - ${category}` : alcoholicOrNot
          }
        </p>
        <div className="share">
          <button type="button" onClick={ handleShare }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share button"
            />
          </button>
        </div>
        <div className="date">
          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        </div>
        <div className="tags">
          {tags.map(
            (tag) => (
              <span
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                { tag }
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

DoneCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DoneCard;
