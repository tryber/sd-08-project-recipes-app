import React, { Component } from 'react';
import PropTypes from 'prop-types';

import copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recommendation from './Recommendation';
import IngredientList from './IngredientList';
import RenderButton from './RenderButton';

class ItemsDetails extends Component {
  constructor() {
    super();
    this.state = {
      copied: false,
      favorited: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleFav = this.handleFav.bind(this);
    this.handleBlackIcon = this.handleBlackIcon.bind(this);
    this.ingredientesComQuantidades = this.ingredientesComQuantidades.bind(this);
  }

  componentDidMount() {
    this.handleBlackIcon();
  }

  handleClick() {
    const { pathname } = this.props;
    const splitPathname = pathname.split('/');
    const pathUrl = `/${splitPathname[1]}/${splitPathname[2]}`;
    const TWO_SECOND = 2000;
    copy(`http://localhost:3000${pathUrl}`);
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, TWO_SECOND);
    });
  }

  handleProgress(type, id) {
    const { history } = this.props;
    if (type === 'Meal') return history.push(`/comidas/${id}/in-progress`);
    return history.push(`/bebidas/${id}/in-progress`);
  }

  handleFav(result, type) {
    const itemId = result[`id${type}`];
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const checkFav = favorites.find((favId) => favId.id === itemId);
      console.log(checkFav);
      if (checkFav !== undefined) {
        const filterFav = favorites.filter((favorite) => itemId !== favorite.id);
        console.log(filterFav);
        return localStorage.setItem('favoriteRecipes', JSON.stringify(filterFav));
      }
      const fav = [...favorites,
        {
          id: result[`id${type}`],
          type: (type === 'Meal' ? 'comida' : 'bebida'),
          area: result.strArea || '',
          category: result.strCategory,
          alcoholicOrNot: result.strAlcoholic || '',
          name: result[`str${type}`],
          image: result[`str${type}Thumb`],
        }];
      return localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: result[`id${type}`],
      type: (type === 'Meal' ? 'comida' : 'bebida'),
      area: result.strArea || '',
      category: result.strCategory,
      alcoholicOrNot: result.strAlcoholic || '',
      name: result[`str${type}`],
      image: result[`str${type}Thumb`],
    }]));
  }

  handleBlackIcon() {
    const { type, result } = this.props;
    const id = result[`id${type}`];
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let checkFav = false;
    if (favorites) checkFav = favorites.find((favId) => favId.id === id);
    if (!checkFav || checkFav === undefined) return this.setState({ favorited: false });
    return this.setState({ favorited: true });
  }

  juntar(chave, itemValue) {
    return Object.entries(itemValue).map((nome) => {
      if (nome[0].includes(chave)) return nome[1];
      return undefined;
    }).filter((element) => element !== undefined);
  }

  checkRecipeProgress(type, id) {
    const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'Meal' && inLocalStorage && inLocalStorage.meals) {
      const filterId = Object.keys(inLocalStorage.meals)
        .find((localId) => id === localId);
      if (filterId) return 'Continuar Receita';
    }
    if (type === 'Drink' && inLocalStorage && inLocalStorage.cocktails) {
      const filterId = Object.keys(inLocalStorage.cocktails)
        .find((localId) => id === localId);
      if (filterId) return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  }

  ingredientesComQuantidades(itemValue) {
    const { pathname } = this.props;
    const ingredient = this.juntar('strIngredient', itemValue);
    const measure = this.juntar('strMeasure', itemValue);
    const splitUrl = pathname.split('/')[3];
    return ingredient.map((nome, index) => {
      if (nome) {
        return (
          <IngredientList
            splitUrl={ splitUrl }
            key={ index }
            index={ index }
          >
            {`${nome} - ${measure[index]}`}
          </IngredientList>
        );
      }
      return undefined;
    });
  }

  startRecipe(type, id) {
    const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'Meal') {
      if (inLocalStorage !== null) {
        const newArray = { ...inLocalStorage,
          meals: { ...inLocalStorage.meals, [id]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
        return;
      }
      const newArray = { meals: { [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
    }
    if (type === 'Drink') {
      if (inLocalStorage !== null) {
        const newArray = { ...inLocalStorage,
          cocktails: { ...inLocalStorage.cocktails, [id]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
        return;
      }
      const newArray = { cocktails: { [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
    }
  }

  render() {
    const { copied, favorited } = this.state;
    const { type, result, pathname, history } = this.props;
    const checkPage = pathname.split('/')[3];

    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ result[`str${type}Thumb`] }
          alt="img"
          width="70px"
        />
        {result.strAlcoholic ? (
          <p data-testid="recipe-category">
            {result.strAlcoholic}
          </p>
        ) : (
          <p data-testid="recipe-category">
            {result.strCategory}
          </p>
        )}
        <button type="button" onClick={ this.handleClick } data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>
        {copied && <span>Link copiado!</span>}
        <button
          type="button"
          onClick={ () => {
            this.handleFav(result, type);
            this.handleBlackIcon(result[`id${type}`]);
          } }
        >
          <img
            data-testid="favorite-btn"
            src={ favorited ? blackHeartIcon
              : whiteHeartIcon }
            alt="favorite"
          />
        </button>
        <h1 data-testid="recipe-title">{ result[`str${type}`] }</h1>
        <p>
          { result.strCategory }
        </p>
        {result.strYoutube
        && <iframe
          title="video"
          data-testid="video"
          src={ result.strYoutube.replace('watch?v=', 'embed/') }
        />}
        <div>
          {this.ingredientesComQuantidades(result)}
        </div>
        <p data-testid="instructions">
          Instruções:
          {result.strInstructions}
        </p>
        <Recommendation />
        <RenderButton
          checkPage={ checkPage }
          startRecipe={ this.startRecipe }
          handleProgress={ this.handleProgress }
          type={ type }
          id={ result[`id${type}`] }
          history={ history }
          checkRecipeProgress={ this.checkRecipeProgress }
          recipe={ result }
        />
      </>
    );
  }
}

export default ItemsDetails;

ItemsDetails.propTypes = {
  type: PropTypes.string.isRequired,
  result: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ItemsDetails.defaultProps = {
  history: undefined,
};
