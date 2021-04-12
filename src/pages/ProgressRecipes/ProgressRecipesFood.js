import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import favIconEnabled from '../../images/blackHeartIcon.svg';
import { /* loadFromLS */ saveToLS, getMealsDetails } from '../../services';
import filterFood from '../../utils/filterDetailsRecipes';

import '../../styles/pages/Container.css';

const INITIAL_STATE_RECIPE_MEAL = {
  idMeal: '',
  strMealThumb: '',
  strMeal: '',
  strCategory: '',
  strInstructions: '',
  ingredients: [],
  measures: [],
};
class ProgressRecipesMeal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...JSON.parse(localStorage.getItem('inProgressRecipe')),
      ...INITIAL_STATE_RECIPE_MEAL };

    this.handleChange = this.handleChange.bind(this);
    this.handleRequestMeal = this.handleRequestMeal.bind(this);
    this.checkExistIngredientArrRecipes = this.checkExistIngredientArrRecipes.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.handleRequestMeal(id);
  }

  handleRequestMeal(id) {
    getMealsDetails(id).then((response) => {
      const meal = filterFood(response, 'meals');
      this.setState((state) => ({
        ...state,
        ...meal,
      }));
    });
    this.setRecipeLocalStorage(id);
  }

  handleChange(ingredient) {
    const { meals, idMeal } = this.state;
    console.log(meals);
    if (!meals[idMeal]) {
      const newRecipe = { [idMeal]: [ingredient] };
      this.setState((state) => ({
        ...state, meals: { ...state.meals, ...newRecipe },
      }
      ));
    } else {
      this.setState((state) => ({
        ...state,
        meals: { ...this.checkExistIngredientArrRecipes(
          ingredient,
          meals,
          state,
        ) },
      }));
    }
  }

  setRecipeLocalStorage() {
    const { meals, cocktails } = this.state;
    saveToLS('inProgressRecipe', { meals, cocktails });
  }

  checkExistIngredientArrRecipes(ingredient, meals, state) {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    let dataSetState = meals[id];
    const checkExist = dataSetState.some((element) => element === ingredient);

    if (!checkExist) {
      dataSetState = { [id]: [...dataSetState, ingredient] };
    } else {
      dataSetState = { [id]: dataSetState
        .filter((element) => element !== ingredient) };
    }
    return { ...state.meals, ...dataSetState };
  }

  checkedIngredientsLS(ingredient) {
    const { meals = {} } = this.state;
    console.log(meals);
    const arrMeals = Object.keys(meals);
    if (arrMeals.length === 0) return false;
    return arrMeals.includes(ingredient);
  }

  render() {
    const {
      idMeal,
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      ingredients,
      measures,
    } = this.state;

    return (
      <div className="recipe-details">
        <img
          style={ { width: '20%' } }
          src={ strMealThumb }
          alt="Meal Thumbnail"
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header box-content">
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
          <div>
            {ingredients.map((ingredient, index) => (
              <label
                key={ ingredient }
                htmlFor={ `${ingredient}-id` }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  defaultChecked={ this.checkedIngredientsLS(ingredient) }
                  id={ `${index}-id-${ingredient}` }
                  onChange={ () => this.handleChange(ingredient)
                    || this.setRecipeLocalStorage() }

                />
                {`${ingredient} - ${measures[index]}`}
              </label>
            ))}
          </div>
        </div>
        <div className="box-content">
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div className="start-btn">
          <Link
            data-testid="finish-recipe-btn"
            className="start-recipe-btn"
            exact
            to={ `/comidas/${idMeal}/in-progress` }
          >
            Finalizar receita
          </Link>
        </div>
      </div>
    );
  }
}
ProgressRecipesMeal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = ({ detailsReducers }) => ({
  recipe: detailsReducers.recipe,
});

export default connect(mapStateToProps)(ProgressRecipesMeal);
