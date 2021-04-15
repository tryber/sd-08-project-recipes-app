import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Redirect } from 'react-router';
import { Button, Container, Image } from 'react-bootstrap';
import fav from '../images/blackHeartIcon.svg';
import notFav from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import { addFoodToFavorite, continueRecipe, fetchDrinkApiById, fetchFoodRecomendation,
  getIngredientList, isFavoriteRecipe, recipeIsDone } from '../helpers';
import RecomendationCard from './RecomendationCard';
import './generico.css';
import IngredientList from './IngredientList';

class GenericoBebidas extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: '',
      currentRecipe: {},
      ingredientList: {},
      recomendations: [],
      isThisRecipeDone: false,
      continueThisRecipe: false,
      favoriteRecipe: false,
    };
    this.redirectToPage = this.redirectToPage.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.favoriteThisItem = this.favoriteThisItem.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi() {
    const { match: { params: { id } } } = this.props;
    this.fetchDrinkRecipe(id);
  }

  async fetchDrinkRecipe(drinkId) {
    const recipe = await fetchDrinkApiById(drinkId);
    const ingredients = getIngredientList(recipe);
    const recomendation = await fetchFoodRecomendation();
    const finishedRechipe = recipeIsDone(drinkId);
    const alreadyStartedThisRecipe = continueRecipe(drinkId, 'bebidas');
    const isFavorite = isFavoriteRecipe(drinkId);
    this.setState({
      ingredientList: ingredients,
      recomendations: recomendation,
      currentRecipe: recipe,
      isThisRecipeDone: finishedRechipe,
      continueThisRecipe: alreadyStartedThisRecipe,
      favoriteRecipe: isFavorite,
    });
  }

  share() {
    copy(window.location);
    const SHOW_TIME = 3000;
    this.setState({ displayShareMesage: true }, () => {
      setTimeout(() => this.setState({ displayShareMesage: false }), SHOW_TIME);
    });
  }

  redirectToPage(page) {
    this.setState({ redirectTo: page });
  }

  favoriteThisItem() {
    const { currentRecipe } = this.state;
    const done = addFoodToFavorite(currentRecipe, 'bebida');
    this.setState({ favoriteRecipe: done });
  }

  render() {
    const { currentRecipe, isThisRecipeDone,
      ingredientList, recomendations, displayShareMesage,
      continueThisRecipe, redirectTo, favoriteRecipe } = this.state;
    const { match: { params: { id } } } = this.props;

    if (redirectTo) {
      return <Redirect push to={ redirectTo } />;
    }

    return (
      <div>
        <Container>
          <center>
            <Image
              src={ currentRecipe.strDrinkThumb }
              alt=""
              data-testid="recipe-photo"
              className="linkImage"
            />
            <h1 data-testid="recipe-title">
              {currentRecipe.strDrink}
            </h1>
            {currentRecipe.strDrink && <h2>{}</h2>}
            <span data-testid="recipe-category">
              {currentRecipe.strAlcoholic}
            </span>
            <button
              className="recipe-button"
              type="button"
              onClick={ () => this.share() }
            >
              <img
                src={ share }
                alt="share"
                data-testid="share-btn"
              />
            </button>
            <button
              className="recipe-button"
              type="button"
              onClick={ this.favoriteThisItem }
            >
              <img
                src={ favoriteRecipe ? fav : notFav }
                alt="share"
                data-testid="favorite-btn"
              />
            </button>

          </center>
          {displayShareMesage && <span>Link copiado!</span>}
          <h2>Ingredientes</h2>
          {ingredientList && <IngredientList ingredientList={ ingredientList } />}
          <div data-testid="instructions">{currentRecipe.strInstructions}</div>
          {recomendations
              && <RecomendationCard
                recomendations={ recomendations }
                redirectToPage={ this.redirectToPage }
              />}
          {!isThisRecipeDone
        && (
          <Button
            block
            className="default-button green"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => {
              this.redirectToPage(`/bebidas/${id}/in-progress`);
            } }
          >
            {continueThisRecipe ? 'Continuar Receita' : 'Iniciar receita'}
          </Button>
        )}
        </Container>
      </div>
    );
  }
}

GenericoBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default GenericoBebidas;
