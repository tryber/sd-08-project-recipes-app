import React, { Component } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMealsDetailsById } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';
import CarouselCocktails from '../components/CarouselCoktails';
import row from '../images/spacer.png';
import Loading from '../components/Loading';

export default class MealRecipeDetails extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      meals: '',
      isLoading: true,
      ingredients: '',
      measures: [],
      isDone: false,
    };
    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.verifyFavorite = this.verifyFavorite.bind(this);
    this.verifyRecipeDone = this.verifyRecipeDone.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    this.verifyFavorite();
    this.verifyRecipeDone();
  }

  handleFavoriteButton() {
    const { favorite } = this.state;
    if (!favorite) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
    this.setStorage();
  }

  setStorage() {
    const { meals, favorite } = this.state;
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meals.meals[0];
    const mealFavorite = {
      id: idMeal,
      type: 'comida',
      alcoholicOrNot: '',
      area: strArea,
      category: strCategory,
      name: strMeal,
      image: strMealThumb,
    };
    if (favorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const itemStorage = storage.filter((item) => item.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (storage) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storage, mealFavorite]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([mealFavorite]));
      }
    }
  }

  verifyFavorite() {
    const { match: { params: { id } } } = this.props;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const fav = favorites.filter((item) => item.id === id);
    if (fav.length) {
      const { favorite } = this.state;
      if (!favorite) {
        this.setState({ favorite: true });
      } else {
        this.setState({ favorite: false });
      }
    }
  }

  verifyRecipeDone() {
    const { match: { params: { id } } } = this.props;
    const recipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipeIsDone = recipesFromStorage.some((recipe) => recipe.id === id);
    if (recipeIsDone) {
      this.setState({ isDone: true });
    }
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const results = await getMealsDetailsById(id);
    const total = 20;
    let arrayIngredients = [];
    let arrayMeasures = [];
    for (let i = 1; i <= total; i += 1) {
      arrayIngredients = [...arrayIngredients, results.meals[0][`strIngredient${i}`]];
      arrayMeasures = [...arrayMeasures, results.meals[0][`strMeasure${i}`]];
    }
    this.setState({
      ingredients: arrayIngredients,
      measures: arrayMeasures,
      meals: results,
      isLoading: false,
    });
  }

  copyLink(id) {
    copy(`http://localhost:3000/comidas/${id}`);
    document.getElementById('link').style = 'inline';
  }

  render() {
    const { meals, isLoading, favorite, ingredients, measures, isDone } = this.state;
    const { match: { params: { id } } } = this.props;
    const recipesFromStorage = (JSON
      .parse(localStorage.getItem('inProgressRecipes'))) || { meals: {} };
    const buttonText = (recipesFromStorage.meals[id] !== undefined)
      ? 'Continuar Receita' : 'Iniciar Receita';

    if (isLoading) return <Loading />;
    const {
      idMeal,
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strYoutube,
    } = meals.meals[0];
    const youtubeId = strYoutube.substring(strYoutube.indexOf('=') + 1);

    return (
      <div className="recipe-details container container-fluid widthM800">
        <img
          src={ strMealThumb }
          alt="Meal Thumbnail"
          data-testid="recipe-photo"
          className="recipe-photo img-fluid width50"
        />
        <div className="recipe-header container d-flex justify-content-between px-1">
          <h1
            data-testid="recipe-title"
            className="recipe-title font-mountains display-4"
          >
            {strMeal}
          </h1>
          <div className="actions">
            <button
              type="button"
              data-testid="share-btn"
              className="action-button btn mt-3 p-1"
              onClick={ () => this.copyLink(idMeal) }
            >
              <img src={ shareIcon } alt="share" className="icon" />
            </button>
            <p id="link" style={ { display: 'none' } }>Link copiado!</p>
            <button
              type="button"
              onClick={ this.handleFavoriteButton }
              className="action-button btn mt-3 p-1"
            >
              <img
                src={ (favorite) ? favIconEnabled : favIconDisabled }
                alt="favorite"
                data-testid="favorite-btn"
                className="favorite-icon icon"
              />
            </button>
          </div>
        </div>
        <span data-testid="recipe-category" className="recipe-category">
          { strCategory }
        </span>
        <img src={ row } alt="row" className="spacer row-1 img-fluid" />
        <div className="box-content white70 p-2">
          <h2 className="txt-shdw1">Ingredients</h2>
          <ul>
            {ingredients
              .filter((item) => item !== '' && item !== null).map((item, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${item} - ${measures[index]}`}
                </li>
              ))}
          </ul>
        </div>
        <img src={ row } alt="row" className="spacer row-2 img-fluid" />
        <div className="box-content white70 p-2">
          <h2 className="txt-shdw1">Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <img src={ row } alt="row" className="spacer row-1 img-fluid" />
        <div className="video-content mx-auto">
          <h2 className="h2 txt-shdw1 center">Video</h2>
          <iframe
            data-testid="video"
            className="iframe-video"
            title={ strMeal }
            width="330"
            height="202.5"
            src={ `https://www.youtube.com/embed/${youtubeId}` }
            frameBorder="0"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;
            gyroscope;picture-in-picture"
            allowFullScreen
          />
        </div>
        <img src={ row } alt="row" className="spacer row-1 img-fluid" />
        <div>
          <CarouselCocktails />
        </div>
        <div className="start-btn">
          {!isDone
          && (
            <Link
              data-testid="start-recipe-btn"
              className="start-recipe-btn btn btn-danger"
              to={ `${idMeal}/in-progress` }
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    );
  }
}

MealRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
