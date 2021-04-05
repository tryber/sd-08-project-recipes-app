import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as RecipesActions } from '../store/ducks/cocktailRecipes';
import { Creators as CategoriesActions } from '../store/ducks/cocktailCategories';
import useToggle from '../hooks/useToggle';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import CardsContainer from '../components/CardsContainer';
import Container from '../components/Container';
import FilterList from '../components/FilterList';
import LoadingScreen from '../components/LoadingScreen';

const RESULTS_LIMIT = 12;

const Cocktails = ({ fetchRecipes, fetchCategories, isFetchingRecipes,
  fetchRecipesByCategory, isFetchingCategories, recipesNotFound,
  recipes, categories }) => {
  const { id } = useParams();
  const [showSearchBar, toggleSearchBar] = useToggle();
  const history = useHistory();

  useEffect(() => {
    fetchCategories();
    if (recipes.length === 0 && !isFetchingRecipes) {
      fetchRecipes();
    }
  }, []);

  if (id) return <p>{ `foi passado o id ${id}` }</p>;

  if (isFetchingRecipes && isFetchingCategories) return <LoadingScreen />;

  if (recipesNotFound) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (recipes.length === 1) {
    return <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />;
  }

  return (
    <Container>
      <Header
        title="Bebidas"
        showSearchButton
        handleToggleSearchBar={ toggleSearchBar }
      />

      { !showSearchBar && <FilterList
        categories={ categories }
        fetchRecipesByCategory={ fetchRecipesByCategory }
      /> }
      { showSearchBar && <SearchBar fetchFunction={ fetchRecipes } /> }
      { recipesNotFound && <p>Nenhuma comida encontrada</p> }
      <CardsContainer>
        { isFetchingRecipes
          ? <LoadingScreen />
          : recipes.length > 1
            && recipes.slice(0, RESULTS_LIMIT).map((cocktail, index) => (
              <Card
                data-testid={ `${index}-recipe-card` }
                key={ cocktail.idDrink }
                name={ cocktail.strDrink }
                thumbnail={ cocktail.strDrinkThumb }
                index={ index }
                onClick={ () => history.push(`/bebidas/${cocktail.idDrink}`) }
              />)) }
      </CardsContainer>
      <Footer />
    </Container>
  );
};

Cocktails.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  isFetchingRecipes: PropTypes.bool.isRequired,
  isFetchingCategories: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipesNotFound: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchRecipesByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({ cocktails: { recipes, categories } }) => ({
  recipes: recipes.recipes,
  categories: categories.categories,
  isFetchingRecipes: recipes.isFetching,
  isFetchingCategories: categories.isFetching,
  recipesNotFound: recipes.notFound,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...RecipesActions,
    ...CategoriesActions,
  }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);
