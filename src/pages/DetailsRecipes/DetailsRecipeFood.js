import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import favIconEnabled from '../../images/blackHeartIcon.svg';
// import favIconDisabled from '../../images/whiteHeartIcon.svg';
import { getDetailsAll as getMealsDetailsAll } from '../../store/actions';
import { Loading } from '../../components';

import '../../styles/pages/DetailRecipe.css';

const MAX_SIX_RECOMMENDATIONS = 6;
const LIMIT_INDEX_DISPLAY = 2;

class DetailsRecipeFood extends Component {
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
      asyncMealsAll,
      location: { pathname },
    } = this.props;
    asyncMealsAll(pathname);
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
      idMeal,
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strYoutube,
      ingredients,
      measures,
    } = recipe;

    return (
      <Loading state={ isFetching }>

        <div className="recipe-header box-content">
          <img
            style={ { width: '50%' } }
            src={ strMealThumb }
            alt="Meal Thumbnail"
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <h1 data-testid="recipe-title" className="recipe-title">
            {strMeal}
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
                style={ { width: '20%' } }
                src={ favIconEnabled }
                alt="favorite"
                data-testid="favorite-btn"
                className="favorite-icon"
              />
            </button>
          </div>
        </div>
        <span data-testid="recipe-category" className="recipe-category">
          {strCategory}
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
        <div className="video-content">
          <h2 className="box-content">Video</h2>
          <iframe
            data-testid="video"
            title={ strMeal }
            width="360"
            height="202.5"
            src={ `https://www.youtube.com/embed/${strYoutube.split('/')[3]}` }
            frameBorder="0"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;
            gyroscope;picture-in-picture"
            allowFullScreen
          />
        </div>
        <h2 className="box-content">Recomendadas</h2>
        <div className="carousel">
          {recommendations.recipe
            .slice(0, MAX_SIX_RECOMMENDATIONS)
            .map((recomendation, index) => (
              <Link
                key={ recomendation.idDrink }
                to={ `/bebidas/${recomendation.idDrink}` }
                className={ index < LIMIT_INDEX_DISPLAY ? 'carousel-content' : 'hidden' }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  src={ recomendation.strDrinkThumb }
                  alt="titulo"
                  className="carousel-item-image"
                />
                <span
                  data-testid={ `${index}-recomendation-title` }
                >
                  {recomendation.strDrink}
                </span>
              </Link>
            ))}
        </div>
        <div>
          <Link
            className="start-btn"
            data-testid="start-recipe-btn"
            exact
            to={ `/comidas/${idMeal}/in-progress` }
          >
            { this.handleTextButton(id) ? 'Continuar Receita' : 'Começar Receita' }

          </Link>

        </div>
      </Loading>
    );
  }
}

DetailsRecipeFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  asyncMealsAll: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measures: PropTypes.arrayOf(PropTypes.string),
    strAlcoholic: PropTypes.string,
  }).isRequired,
  recommendations: PropTypes.shape({
    recipe: PropTypes.arrayOf }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  idMeal: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  detailsReducers: { recipe, recommendations, isFetching },
}) => ({
  recipe,
  recommendations,
  isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  asyncMealsAll: (pathname) => dispatch(getMealsDetailsAll(pathname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRecipeFood);
