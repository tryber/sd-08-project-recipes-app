import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Recomendations({ recipeType }) {
  const [recomendations, setRecomendations] = useState([]);
  const url = (recipeType === 'meal') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recomendationType = (recipeType === 'meal') ? 'Drink' : 'Meal';

  useEffect(() => {
    async function getRecomendations() {
      const data = await fetch(url);
      const response = await data.json();
      const key = Object.keys(response)[0];
      setRecomendations(response[key]);
    }
    getRecomendations();
  }, [url]);

  if (recomendations[0]) {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="w-50"
            data-testid="0-recomendation-card"
            src={ recomendations[0][`str${recomendationType}Thumb`] }
            alt="recomendation"
          />
          <img
            className="w-50"
            data-testid="1-recomendation-card"
            src={ recomendations[1][`str${recomendationType}Thumb`] }
            alt="recomendation"
          />
          <Carousel.Caption>
            <span
              data-testid="0-recomendation-title"
            >
              {recomendations[0][`str${recomendationType}`]}
            </span>
            {'   /   '}
            <span
              data-testid="1-recomendation-title"
            >
              {recomendations[1][`str${recomendationType}`]}
            </span>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-50"
            data-testid="2-recomendation-card"
            src={ recomendations[2][`str${recomendationType}Thumb`] }
            alt="recomendation"
          />
          <img
            className="w-50"
            data-testid="3-recomendation-card"
            src={ recomendations[3][`str${recomendationType}Thumb`] }
            alt="recomendation"
          />
          <Carousel.Caption>
            <span
              data-testid="2-recomendation-title"
            >
              {recomendations[2][`str${recomendationType}`]}
            </span>
            {'   /   '}
            <span
              data-testid="3-recomendation-title"
            >
              {recomendations[3][`str${recomendationType}`]}
            </span>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w-50"
            data-testid="4-recomendation-card"
            src={ recomendations[4][`str${recomendationType}Thumb`] }
            alt="recomendation"
          />
          <img
            className="w-50"
            data-testid="5-recomendation-card"
            src={ recomendations[5][`str${recomendationType}Thumb`] }
            alt="recomendation"
          />
          <Carousel.Caption>
            <span
              data-testid="4-recomendation-title"
            >
              {recomendations[4][`str${recomendationType}`]}
            </span>
            {'   /   '}
            <span
              data-testid="5-recomendation-title"
            >
              {recomendations[5][`str${recomendationType}`]}
            </span>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  } return null;
}

Recomendations.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default Recomendations;
