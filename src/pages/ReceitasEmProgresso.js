import React, { Component } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Container, Image, Button } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import { addFoodToFavorite, fetchDrinkApiById, fetchFoodApiById,
  getIngredientList, isFavoriteRecipe } from '../helpers';
import fav from '../images/blackHeartIcon.svg';
import notFav from '../images/whiteHeartIcon.svg';

class ReceitasEmProgresso extends Component {
  constructor() {
    super();
    this.state = {
      ingredientList: [],
      displayShareMesage: false,
      favoriteRecipe: false,
      disable: true,
      currentRecipe: '',
      isDone: '',
    };
    this.fetchDrinkRecipe = this.fetchDrinkRecipe.bind(this);
    this.fetchFoodRecipe = this.fetchFoodRecipe.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
    this.share = this.share.bind(this);
    this.favoriteThisItem = this.favoriteThisItem.bind(this);
    this.isDisable = this.isDisable.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleChangeChecked(event) {
    const { isDone } = this.state;
    const { name, checked } = event.target;
    this.setState({ isDone: { ...isDone, [name]: checked } }, () => this.isDisable());
  }

  share() {
    const { location } = window;
    const { href } = location;
    const retiraInProgressDoLink = -12;
    const link = href.slice(0, retiraInProgressDoLink);
    copy(link);
    const SHOW_TIME = 3000;
    this.setState({ displayShareMesage: true }, () => {
      setTimeout(() => this.setState({ displayShareMesage: false }), SHOW_TIME);
    });
  }

  fetchApi() {
    const { match: { params: { id } } } = this.props;
    const { location } = window;
    const { href } = location;
    if (href.includes('comida')) {
      this.fetchFoodRecipe(id);
    }
    if (href.includes('bebida')) {
      this.fetchDrinkRecipe(id);
    }
  }

  async fetchDrinkRecipe(drinkId) {
    const storage = JSON.parse(localStorage.getItem('isDone'));
    const recipe = await fetchDrinkApiById(drinkId);
    const ingredients = getIngredientList(recipe);
    const arrIngredientes = Object.values(ingredients);
    const isDone = storage || arrIngredientes.reduce((acc, crr) => {
      acc = { ...acc, [crr.item]: false };
      return acc;
    }, {});

    const isFavorite = isFavoriteRecipe(drinkId);
    this.setState({
      isDone,
      ingredientList: arrIngredientes,
      currentRecipe: recipe,
      favoriteRecipe: isFavorite,
    });
    this.isDisable();
  }

  async fetchFoodRecipe(foodId) {
    const storage = JSON.parse(localStorage.getItem('isDone'));
    const recipe = await fetchFoodApiById(foodId);
    const ingredients = getIngredientList(recipe);
    const arrIngredientes = Object.values(ingredients);
    const isDone = storage || arrIngredientes.reduce((acc, crr) => {
      acc = { ...acc, [crr.item]: false };
      return acc;
    }, {});

    const isFavorite = isFavoriteRecipe(foodId);
    this.setState({
      isDone,
      ingredientList: arrIngredientes,
      currentRecipe: recipe,
      favoriteRecipe: isFavorite,
    });
    this.isDisable();
  }

  favoriteThisItem() {
    let variavel = '';
    const { currentRecipe } = this.state;
    const { location } = window;
    const { href } = location;
    if (href.includes('comida')) {
      variavel = 'comida';
    }
    if (href.includes('bebida')) {
      variavel = 'bebida';
    }

    const done = addFoodToFavorite(currentRecipe, variavel);
    this.setState({ favoriteRecipe: done });
  }

  inputCards() {
    const { ingredientList, isDone, displayShareMesage,
      favoriteRecipe, disable, currentRecipe } = this.state;
    const { history } = this.props;
    let thumb = '';
    let h1 = '';
    if (history.location.pathname.includes('bebida')) {
      thumb = currentRecipe.strDrinkThumb;
      h1 = currentRecipe.strDrink;
    } else {
      thumb = currentRecipe.strMealThumb;
      h1 = currentRecipe.strMeal;
    }
    return (
      <div>
        <Container>
          <center>
            <h1 data-testid="recipe-title">{h1}</h1>
            <Image
              data-testid="recipe-photo"
              alt="receita-em-progresso"
              src={ thumb }
              className="linkImage"
            />
          </center>
          <button
            className="recipe-button"
            type="button"
            onClick={ () => this.share() }
          >
            <img
              alt="card"
              data-testid="share-btn"
              src={ shareIcon }
            />
            {' '}
          </button>
          { displayShareMesage ? <p className="alert">Link copiado!</p> : <div />}
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
          <p data-testid="recipe-category" />
          {}
          {ingredientList.map((obj, index) => (
            <div key={ index }>

              {' '}
              <label
                htmlFor={ obj.item }
                className={ isDone[obj.item] ? 'checkboxInProgressChecked' : 'nunCheck' }
                data-testid={ `${index}-ingredient-step` }
              >
                {obj.item}
                :
                {' '}
                {obj.quantity}
                <input
                  name={ obj.item }
                  // className="checkboxInProgress"
                  type="checkbox"
                  id={ obj.item }
                  checked={ isDone[obj.item] }
                  onChange={ (event) => this.handleChangeChecked(event) }
                />
              </label>
              {' '}

            </div>

          ))}
          <p data-testid="instructions" />
          <Button
            block
            className="default-button"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ disable }
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finish
          </Button>
          <br />
          <br />
        </Container>
      </div>
    );
  }

  updateStorage() {
    const { isDone } = this.state;
    if (!isDone) return;
    localStorage.setItem('isDone', JSON.stringify(isDone));
  }

  isDisable() {
    const { isDone } = this.state;
    if (isDone === '') return;
    const str = JSON.stringify(isDone);
    if (str.includes('false')) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  render() {
    this.updateStorage();
    return (
      <div>
        {this.inputCards()}
      </div>
    );
  }
}

ReceitasEmProgresso.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape.isRequired,
};

export default ReceitasEmProgresso;
