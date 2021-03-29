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

class MealRecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      meals: '',
      isLoading: true,
      ingredients: '',
      measures: [],
    };

    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.verifyFavorite = this.verifyFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    this.verifyFavorite();
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
        this.setState({
          favorite: true,
        });
      } else {
        this.setState({
          favorite: false,
        });
      }
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
    const { meals, isLoading, favorite, ingredients, measures } = this.state;
    if (isLoading) return <p>Loading...</p>;
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
      <div className="recipe-details">
        <img
          src={ strMealThumb }
          alt="Meal Thumbnail"
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header box-content">
          <h1 data-testid="recipe-title" className="recipe-title">{strMeal}</h1>
          <div className="actions">
            <button
              type="button"
              data-testid="share-btn"
              className="action-button"
              onClick={ () => this.copyLink(idMeal) }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            <p id="link" style={ { display: 'none' } }>Link copiado!</p>
            <button
              type="button"
              onClick={ this.handleFavoriteButton }
              className="action-button"
            >
              <img
                src={ (favorite) ? favIconEnabled : favIconDisabled }
                alt="favorite"
                data-testid="favorite-btn"
                className="favorite-icon"
              />
            </button>
          </div>
        </div>
        <span data-testid="recipe-category" className="recipe-category">
          { strCategory }
        </span>
        <img src={ row } alt="row" className="spacer" />
        <div className="box-content">
          <h2>Ingredients</h2>
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
        <img src={ row } alt="row" className="spacer" />
        <div className="box-content">
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <img src={ row } alt="row" className="spacer" />
        <div className="video-content">
          <h2 className="box-content">Video</h2>
          <iframe
            data-testid="video"
            title={ strMeal }
            width="360"
            height="202.5"
            src={ `https://www.youtube.com/embed/${youtubeId}` }
            frameBorder="0"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;
            gyroscope;picture-in-picture"
            allowFullScreen
          />
        </div>
        <img src={ row } alt="row" className="spacer" />
        <div>
          <CarouselCocktails />
        </div>
        <div className="start-btn">
          <Link
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            to={ `${idMeal}/in-progress` }
          >
            Iniciar receita
          </Link>
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

export default MealRecipeDetails;
