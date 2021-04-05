import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CarouselCard from '../Card/CarouselCard';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { FoodCtx } from '../../context/ContextFood';

function DrinkDetailsInfo({ strCategory,
  strAlcoholic,
  handleFavorite,
  isFavorite,
  strDrink,
  strDrinkThumb,
  handleClick,
  ingredientsAndMeasuresList,
  strInstructions,
  copied,
}) {
  const { foodApi: { meals } } = useContext(FoodCtx);
  const STOP_INDEX = 5;
  return (
    <div className="recipe-container">
      <h2 data-testid="recipe-title">{ strDrink }</h2>
      <span data-testid="recipe-category">
        { strCategory }
        <span>{ strAlcoholic }</span>
      </span>
      <div className="icons">
        <button
          className="share-btn"
          type="button"
          data-testid="share-btn"
          onClick={ handleClick }
        >
          <img src={ shareIcon } alt="Compartilhar" />
          {copied && 'Link copiado!'}
        </button>
        <button
          className="favorite-btn"
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Compartilhar"
          />
        </button>
      </div>
      <img
        className="detail-image"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt="Recipe pic"
      />
      <ul>
        { ingredientsAndMeasuresList
          .filter((ingr) => ingr !== '' && ingr !== null)
          .map(
            (ing, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ing}
              </li>),
          ) }
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      {meals && meals
        .filter((meal, index) => index <= STOP_INDEX)
        .map((item, index) => (
          <CarouselCard
            key={ item.idMeal }
            id={ item.idMeal }
            name={ item.strMeal }
            img={ item.strMealThumb }
            index={ index }
          />

        ))}
    </div>
  );
}

DrinkDetailsInfo.propTypes = {
  copied: PropTypes.bool.isRequired,
  strCategory: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  ingredientsAndMeasuresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  strInstructions: PropTypes.string.isRequired,
};

export default DrinkDetailsInfo;
