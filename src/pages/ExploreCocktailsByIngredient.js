import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as IngredientsActions } from '../store/ducks/cocktailIngredients';
import { Creators as RecipesActions } from '../store/ducks/cocktailRecipes';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
// import IngredientCard from '../components/IngredientCard';
import Card from '../components/Card';
import CardsContainer from '../components/CardsContainer';

const COCKTAILS_LIMIT = 12;

const ExploreCocktailsByIngredient = ({ fetchIngredients,
  fetchRecipesByIngredient, ingredients }) => {
  const history = useHistory();

  useEffect(() => {
    fetchIngredients();
  }, []);

  function handleRedirect(ingredient) {
    fetchRecipesByIngredient(ingredient);
    history.push('/bebidas');
  }

  return (
    <Container>
      <Header title="Explorar Ingredientes" />
      <CardsContainer>
        { ingredients.length > 0 && ingredients.map(({
          strIngredient1,
          thumbnail = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`,
        }, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            name={ strIngredient1 }
            thumbnail={ thumbnail }
            index={ index }
            onClick={ () => handleRedirect(strIngredient1) }
          />
        )) }
      </CardsContainer>
      <Footer />
    </Container>
  );
};

ExploreCocktailsByIngredient.propTypes = {
  fetchIngredients: PropTypes.func.isRequired,
  fetchRecipesByIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ cocktails: { ingredients } }) => ({
  ingredients: ingredients.ingredients.slice(0, COCKTAILS_LIMIT),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...IngredientsActions,
  ...RecipesActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExploreCocktailsByIngredient);
