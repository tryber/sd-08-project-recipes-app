import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import * as cocktailApi from '../services/cocktailApi';
import { Creators as InProgressRecipesActions } from '../store/ducks/inProgressRecipes';
import { Creators as FavoriteRecipesActions } from '../store/ducks/favoriteRecipes';

import previousIcon from '../images/previousIcon.svg';

import LoadingScreen from '../components/LoadingScreen';
import PrimaryButton from '../components/PrimaryButton';
import RecipeHeader from '../components/RecipeHeader';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';

import styles from '../styles/pages/CocktailDetails.module.css';
import MealRecipeRecommendations from '../components/MealRecipeRecommendations';

const CocktailDetails = ({ addInProgressCocktail, cocktails, addFavoriteRecipe }) => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    cocktailApi.getById(id).then((response) => {
      setCocktail(response.drinks[0]);
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    setRecipeInProgress(cocktails[id]);
  });

  useEffect(() => {
    const ingredientKeys = Object.keys(cocktail)
      .filter((item) => item.includes('Ingredient'));
    const measureKeys = Object.keys(cocktail).filter((item) => item.includes('Measure'));
    const measureList = measureKeys.map((measure) => cocktail[measure])
      .filter((item) => item !== '' && item !== null);
    const ingredientList = ingredientKeys.map((key) => cocktail[key])
      .filter((item) => item !== '' && item !== null);
    setIngredients(ingredientList);
    setMeasures(measureList);
  }, [cocktail]);

  function handleStartRecipe() {
    addInProgressCocktail(cocktail);
    history.push(`/bebidas/${cocktail.idDrink}/in-progress`);
  }

  if (isFetching) return <LoadingScreen />;

  return (
    <div className={ styles.cocktailDetails }>
      <Link className={ styles.homeButton } to="/bebidas">
        <img src={ previousIcon } alt="Meals button icon" />
      </Link>

      <img
        src={ cocktail.strDrinkThumb }
        alt={ cocktail.strDrink }
        className={ styles.photo }
        data-testid="recipe-photo"
      />

      <div className={ styles.cocktailDetailsContainer }>
        <RecipeHeader
          title={ cocktail.strDrink }
          category={ cocktail.strAlcoholic }
          id={ cocktail.idDrink }
          handleFavorite={ () => { addFavoriteRecipe(cocktail); } }
        />
        <RecipeIngredients ingredients={ ingredients } measures={ measures } />
        <RecipeInstructions instructions={ cocktail.strInstructions } />
        <MealRecipeRecommendations />
        <div data-testid="start-recipe-btn" className={ styles.floatButton }>
          <PrimaryButton
            onClick={ handleStartRecipe }
          >
            { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

CocktailDetails.propTypes = {
  addInProgressCocktail: PropTypes.func.isRequired,
  addFavoriteRecipe: PropTypes.func.isRequired,
  cocktails: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ inProgressRecipes }) => ({
  cocktails: inProgressRecipes.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  addInProgressCocktail: (cocktail) => (
    dispatch(InProgressRecipesActions.addCocktail(cocktail))),
  addFavoriteRecipe: (recipe) => dispatch(FavoriteRecipesActions.addRecipe(recipe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailDetails);
