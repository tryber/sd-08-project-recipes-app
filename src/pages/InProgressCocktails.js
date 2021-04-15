import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCocktailsDetailsById } from '../services/cocktailsAPI';
import row from '../images/spacer.png';
import IngredientsList from '../components/IngredientsList';
import ImageInProgres from '../components/ImageInProgress';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import FinishButton from '../components/FinishButton';
import Loading from '../components/Loading';

export default class InProgressCocktails extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      cocktails: '',
      isLoading: true,
      ingredients: [],
      measures: [],
      checkeds: {},
      isDone: false,
      storageInfos: {},
    };
    this.handleFavoriteBtn = this.handleFavoriteBtn.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.getStorage = this.getStorage.bind(this);
    this.verifyFavorite = this.verifyFavorite.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.stateUpdate = this.stateUpdate.bind(this);
    this.setDone = this.setDone.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    this.getStorage();
    this.verifyFavorite();
    const { ingredients, checkeds } = this.state;
    if (ingredients && !Object.keys(checkeds).length) return this.stateUpdate();
  }

  componentDidUpdate() {
    const { checkeds, isDone } = this.state;
    if (checkeds) {
      const checkedsValues = Object.values(checkeds);
      const allTrue = checkedsValues.every((item) => item === true);
      if (!Object.keys(checkeds).length) { this.stateUpdate(); }
      if (!isDone && allTrue) { this.setDone(true); }
      if (isDone && !allTrue) { this.setDone(false); }
    }
  }

  handleFavoriteBtn() {
    const { favorite } = this.state;
    if (!favorite) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
    this.setStorage();
  }

  async handleCheck({ target }) {
    const { match: { params: { id } } } = this.props;
    const { checkeds } = this.state;
    const { name } = target;
    this.setState({ checkeds: { ...checkeds, [name]: !checkeds[name] } }, () => {
      this.SaveToLocalStorage(id);
    });
  }

  async getStorage() {
    const { checkeds } = this.state;
    const { match: { params: { id } } } = this.props;
    const infosRetrieved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (infosRetrieved === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: {}, cocktails: { [id]: [] } }));
      this.setState({ storageInfos: { meals: {}, cocktails: { [id]: [] } } });
    } else if (infosRetrieved.cocktails[id]) {
      const objRetrieved = { ...infosRetrieved.cocktails[id] };
      this.setState({ storageInfos: infosRetrieved, checkeds: { ...objRetrieved[0] } });
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...infosRetrieved,
          cocktails: { ...infosRetrieved.cocktails, [id]: [checkeds] } },
      ));
      this.setState({ storageInfos: infosRetrieved });
    }
  }

  setDone(bool) {
    this.setState({ isDone: bool });
  }

  setStorage() {
    const { cocktails, favorite } = this.state;
    const {
      idDrink,
      strAlcoholic,
      strCategory,
      strDrink,
      strDrinkThumb,
    } = cocktails.drinks[0];
    const cocktailsFavorite = {
      id: idDrink,
      type: 'bebida',
      alcoholicOrNot: strAlcoholic,
      area: '',
      category: strCategory,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (favorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const itemStorage = storage.filter((item) => item.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (storage) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...storage, cocktailsFavorite]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([cocktailsFavorite]));
      }
    }
  }

  SaveToLocalStorage(id) {
    const { checkeds, storageInfos } = this.state;
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { ...storageInfos,
        cocktails: { ...storageInfos.cocktails, [id]: [checkeds] } },
    ));
  }

  stateUpdate() {
    const { ingredients, checkeds } = this.state;
    if (ingredients) {
      ingredients.forEach((item) => {
        this.setState({ checkeds: Object.assign(checkeds, { [item]: false }) });
      });
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

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const results = await getCocktailsDetailsById(id);
    const total = 20;
    let arrayIngredients = [];
    let arrayMeasures = [];
    for (let i = 1; i <= total; i += 1) {
      arrayIngredients = [...arrayIngredients, results.drinks[0][`strIngredient${i}`]]
        .filter((item) => item !== '' && item !== null && item !== undefined);
      arrayMeasures = [...arrayMeasures, results.drinks[0][`strMeasure${i}`]];
    }
    this.setState({
      ingredients: arrayIngredients,
      measures: arrayMeasures,
      cocktails: results,
      isLoading: false,
    });
  }

  render() {
    const {
      cocktails,
      isLoading,
      favorite,
      ingredients,
      measures,
      checkeds,
      isDone,
    } = this.state;
    if (isLoading) return <Loading />;
    const {
      idDrink,
      strDrinkThumb,
      strDrink,
      strInstructions,
      strCategory,
    } = cocktails.drinks[0];
    return (
      <div className="recipe-details container">
        <ImageInProgres strThumb={ strDrinkThumb } />
        <div className="recipe-header container d-flex justify-content-between px-1">
          <h1
            data-testid="recipe-title"
            className="recipe-title font-mountains display-4"
          >
            {strDrink}
          </h1>
          <div className="actions">
            <ShareButton id={ idDrink } type="cocktail" />
            <FavoriteButton handleFavBtn={ this.handleFavoriteBtn } fav={ favorite } />
          </div>
        </div>
        <span data-testid="recipe-category" className="recipe-category">
          { strCategory }
        </span>
        <img src={ row } alt="row" className="spacer row-1 img-fluid" />
        <div className="box-content white70 p-2">
          <h2 className="txt-shdw1">Ingredients</h2>
          <ul>
            <IngredientsList
              ingredients={ ingredients }
              handleCheck={ this.handleCheck }
              checkeds={ checkeds }
              measures={ measures }
            />
          </ul>
        </div>
        <img src={ row } alt="row" className="spacer row-2 img-fluid" />
        <div className="box-content white70 p-2">
          <h2 className="txt-shdw1">Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <img src={ row } alt="row" className="spacer row-1 img-fluid" />
        <div className="start-btn">
          <FinishButton isDone={ isDone } recipe={ cocktails.drinks[0] } />
        </div>
      </div>
    );
  }
}
InProgressCocktails.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }).isRequired }).isRequired });
