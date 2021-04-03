import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
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
    this.favoriteThisItem = this.favoriteThisItem.bind(this);
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

  async fetchApi() {
    const { match: { params: { id } } } = this.props;
    const { location } = window;
    const { href } = location;
    let recipe = '';
    if (href.includes('comida')) {
      recipe = await fetchFoodApiById(id);
    }
    if (href.includes('bebida')) {
      recipe = await fetchDrinkApiById(id);
    }
    const ingredients = getIngredientList(recipe);
    const arrIngredientes = Object.values(ingredients);
    const storage = JSON.parse(localStorage.getItem('isDone'));
    const obj = arrIngredientes.reduce((acc, crr) => {
      acc = { ...acc, [crr.item]: false };
      return acc;
    }, {});
    let isDone;
    if (storage !== null
          && JSON.stringify(Object.keys(storage)) === JSON.stringify(Object.keys(obj))) {
      isDone = storage;
    } else {
      isDone = obj;
    }
    const isFavorite = isFavoriteRecipe(id);
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
    const { history, addRecipe } = this.props;
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
      <div className="card">
        <center>
          <h1 data-testid="recipe-title">{h1}</h1>
          <img
            data-testid="recipe-photo"
            alt="receita-em-progresso"
            src={ thumb }
            className="linkImage"
          />
        </center>
        <button
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
                className="checkboxInProgress"
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
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disable }
          onClick={ () => {
            history.push('/receitas-feitas');
            addRecipe(currentRecipe);
          } }
        >
          Finish
        </button>
        <br />
        <br />
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
  addRecipe: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  addRecipe: (recipe) => dispatch({ type: 'ADD_RECIPE', payload: recipe }),
});
export default connect(null, mapDispatchToProps)(ReceitasEmProgresso);
