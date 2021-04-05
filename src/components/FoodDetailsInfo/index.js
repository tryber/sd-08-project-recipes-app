import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import CarouselCard from '../Card/CarouselCard';
import { DrinkCtx } from '../../context/ContextDrink';

function FoodDetailsInfo({
  copied,
  strMeal,
  strCategory,
  handleClick,
  handleFavorite,
  isFavorite,
  strMealThumb,
  strYoutube,
  strInstructions,
  ingredientsAndMeasuresList }) {
  const { drinkApi: { drinks } } = useContext(DrinkCtx);
  const STOP_INDEX = 5;

  return (
    <>
      <div className="recipe-container">
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <span data-testid="recipe-category">{ strCategory }</span>
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
            type="button"
            className="favorite-btn"
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
          src={ strMealThumb }
          alt="Recipe pic"
        />
        <div>
          <iframe
            data-testid="video"
            width="280"
            height="157"
            src={ strYoutube }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
              autoplay; clipboard-write;
              encrypted-media;
              gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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
      </div>
      <div className="carousel-wraper">
        <div className="carousel">
          {drinks && drinks
            .filter((drink, index) => index <= STOP_INDEX)
            .map((item, index) => (
              <CarouselCard
                key={ item.idDrink }
                id={ item.idDrink }
                name={ item.strDrink }
                img={ item.strDrinkThumb }
                index={ index }
              />
            ))}
        </div>
      </div>
    </>
  );
}

FoodDetailsInfo.propTypes = {
  copied: PropTypes.bool.isRequired,
  strMeal: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strYoutube: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  ingredientsAndMeasuresList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FoodDetailsInfo;
