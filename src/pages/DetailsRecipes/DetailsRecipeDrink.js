import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import favIconEnabled from '../../images/blackHeartIcon.svg';
// import favIconDisabled from '../../images/whiteHeartIcon.svg';
import { getDetailsAll as getDrinksDetailsAll } from '../../store/actions';
import { Loading } from '../../components';

import '../../styles/pages/DetailRecipe.css';

const MAX_SIX_RECOMMENDATIONS = 6;
const LIMIT_INDEX_DISPLAY = 2;

class DetailsRecipeDrink extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.state = {
      ...{ id } };
  }

  componentDidMount() {
    const {
      asyncDrinksAll,
      location: { pathname },
    } = this.props;
    asyncDrinksAll(pathname);
  }

  handleTextButton(id) {
    const data = localStorage.getItem('inProgressRecipes');
    if (!data) return false;
    const arr = Object.values(JSON.parse(data));
    const check = arr.some((el) => (Number(Object.keys(el))) === Number(id));
    console.log(check);
    return check;
  }

  render() {
    const { isFetching, recipe, recommendations } = this.props;
    const { id } = this.state;
    const {
      strDrinkThumb,
      strDrink,
      strInstructions,
      ingredients,
      measures,
      strAlcoholic,
    } = recipe;

    return (
      <Loading state={ isFetching }>

        <div className="recipe-header box-content">
          <img
            style={ { width: '50%' } }
            src={ strDrinkThumb }
            alt="Drink Thumbnail"
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <h1 data-testid="recipe-title" className="recipe-title">
            {strDrink}
          </h1>
          <div className="actions">
            <button
              type="button"
              data-testid="share-btn"
              className="action-button"
            >
              <img src={ shareIcon } alt="share" />
            </button>
            <p id="link" style={ { display: 'none' } }>
              Link copiado!
            </p>
            <button type="button" className="action-button">
              <img
                src={ favIconEnabled }
                alt="favorite"
                data-testid="favorite-btn"
                className="favorite-icon"
              />
            </button>
          </div>
        </div>
        <span data-testid="recipe-category" className="recipe-category">
          {strAlcoholic}
        </span>
        <div className="box-content">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measures[index]}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="box-content">
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <h2 className="box-content">Recomendadas</h2>
        <div className="carousel">
          {recommendations.recipe
            .slice(0, MAX_SIX_RECOMMENDATIONS)
            .map((recommendation, index) => (
              <Link
                key={ recommendation.idMeal }
                to={ `/bebidas/${recommendation.idMeal}` }
                className={ index < LIMIT_INDEX_DISPLAY ? 'carousel-content' : 'hidden' }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  src={ recommendation.strMealThumb }
                  alt="titulo"
                  className="carousel-item-image"
                />
                <span
                  data-testid={ `${index}-recomendation-title` }
                >
                  {recommendation.strMeal}
                </span>
              </Link>
            ))}
        </div>
        <div>
          <Link
            className="start-btn"
            data-testid="start-recipe-btn"
            to={ `/bebidas/${id}/in-progress` }
          >
            { this.handleTextButton(id) ? 'Continuar Receita' : 'Começar Receita' }
          </Link>
        </div>
      </Loading>
    );
  }
}

DetailsRecipeDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  asyncDrinksAll: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measures: PropTypes.arrayOf(PropTypes.string),
    strAlcoholic: PropTypes.string,
  }).isRequired,
  recommendations: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  detailsReducers: { recipe, recommendations, isFetching },
}) => ({
  recipe,
  recommendations,
  isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  asyncDrinksAll: (pathname) => dispatch(getDrinksDetailsAll(pathname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRecipeDrink);
