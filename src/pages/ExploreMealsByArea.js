import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AreasActions } from '../store/ducks/mealAreas';
import { Creators as RecipesActions } from '../store/ducks/mealRecipes';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Card from '../components/Card';
import CardsContainer from '../components/CardsContainer';
import LoadingScreen from '../components/LoadingScreen';

import styles from '../styles/pages/ExploreMealsByArea.module.css';

const RESULTS_LIMIT = 12;

const ExploreMealsByArea = ({ areas, fetchAreas, isFetchingAreas,
  isFetchingRecipes, recipes, fetchRecipesByArea }) => {
  const history = useHistory();

  useEffect(() => {
    if (areas.length === 0 && !isFetchingAreas) fetchAreas();
    fetchRecipesByArea('All');
  }, []);

  return (
    <Container>
      <Header title="Explorar Origem" showSearchButton />

      <div className={ styles.dropdownContainer }>
        <select
          data-testid="explore-by-area-dropdown"
          className={ styles.dropdown }
          onChange={ ({ target }) => fetchRecipesByArea(target.value) }
        >
          { ['All', ...areas].map((area, index) => (
            <option
              data-testid={ `${area}-option` }
              key={ index }
              value={ area }
            >
              {area}
            </option>)) }
        </select>
      </div>

      <CardsContainer>
        { isFetchingRecipes
          ? <LoadingScreen />
          : recipes.length >= 1
            && recipes.slice(0, RESULTS_LIMIT).map((recipe, index) => (
              <Card
                data-testid={ `${index}-recipe-card` }
                key={ recipe.idMeal }
                name={ recipe.strMeal }
                thumbnail={ recipe.strMealThumb }
                index={ index }
                onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
              />)) }
      </CardsContainer>
      <Footer />
    </Container>
  );
};

ExploreMealsByArea.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAreas: PropTypes.func.isRequired,
  fetchRecipesByArea: PropTypes.func.isRequired,
  isFetchingAreas: PropTypes.bool.isRequired,
  isFetchingRecipes: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ meals }) => ({
  areas: meals.areas.areas,
  isFetchingAreas: meals.areas.isFetching,
  isFetchingRecipes: meals.recipes.isFetching,
  recipes: meals.recipes.recipes,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...AreasActions,
  ...RecipesActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMealsByArea);
