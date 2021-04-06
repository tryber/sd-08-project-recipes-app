import { Grid } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';
import './styles.css';

const IngredientCardsContainer = ({ cardsInfos, cardType, maxCards }) => {
  const cardTypes = {
    food: {
      ingredient: 'strIngredient',
      URL: 'https://www.themealdb.com/images/ingredients/',
      redirectPath: '/comidas/ingredientes/',
    },
    drink: {
      ingredient: 'strIngredient1',
      URL: 'https://www.thecocktaildb.com/images/ingredients/',
      redirectPath: '/bebidas/ingredientes/',
    },
  };

  const cardsToRender = () => {
    if (!cardsInfos) return [];
    if (cardsInfos.length > maxCards) return cardsInfos.slice(0, maxCards);
    return cardsInfos;
  };

  const { ingredient, URL, redirectPath } = cardTypes[cardType];

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="ingredient-cards-container"
    >
      {cardsToRender().map((card, index) => (

        <RecipeCard
          key={ card[ingredient] }
          title={ card[ingredient] }
          thumbnail={ `${URL}${card[ingredient]}-Small.png` }
          index={ index }
          cardType="ingredient"
          clickRedirectPath={ `${redirectPath}${card[ingredient]}` }
        />
      ))}
    </Grid>
  );
};

IngredientCardsContainer.propTypes = {
  cardsInfos: PropTypes.arrayOf(PropTypes.object),
  cardType: PropTypes.string.isRequired,
  maxCards: PropTypes.number.isRequired,
};

IngredientCardsContainer.defaultProps = {
  cardsInfos: [],
};

export default IngredientCardsContainer;
