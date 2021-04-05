import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as IngredientsActions } from '../store/ducks/mealIngredients';
import { Creators as RecipesActions } from '../store/ducks/mealRecipes';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
// import IngredientCard from '../components/IngredientCard';
import Card from '../components/Card';
import CardsContainer from '../components/CardsContainer';

const INGREDIENTS_LIMIT = 12;

const ExploreMealsByIngredient = ({ fetchIngredients,
  fetchRecipesByIngredient, ingredients }) => {
  const history = useHistory();

  useEffect(() => {
    fetchIngredients();
  }, []);

  function handleRedirect(category) {
    fetchRecipesByIngredient(category);
    history.push('/comidas');
  }

  return (
    <Container>
      <Header title="Explorar Ingredientes" />
      <CardsContainer>
        { ingredients.length > 0 && ingredients.map(({
          strIngredient,
          idIngredient,
          thumbnail = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`,
        }, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            key={ idIngredient }
            name={ strIngredient }
            thumbnail={ thumbnail }
            index={ index }
            onClick={ () => handleRedirect(strIngredient) }
          />
        )) }
      </CardsContainer>
      <Footer />
    </Container>
  );
};

ExploreMealsByIngredient.propTypes = {
  fetchIngredients: PropTypes.func.isRequired,
  fetchRecipesByIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ meals: { ingredients } }) => ({
  ingredients: ingredients.ingredients.slice(0, INGREDIENTS_LIMIT),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...IngredientsActions,
  ...RecipesActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMealsByIngredient);
