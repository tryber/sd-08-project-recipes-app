import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CocktailCard from '../components/CocktailCard';
import {
  fetchRandomCocktails,
  fetchCocktailsCategories,
  setCocktailsIngredientCurrency,
} from '../actions/cocktails';
import Loading from '../components/Loading';

class Cocktails extends Component {
  componentDidMount() {
    const {
      searchCocktailsCategories,
      searchRandomCocktails,
      ingredientCurrency,
      sendCocktailsIngredientsCurrency,
    } = this.props;
    if (ingredientCurrency !== '') sendCocktailsIngredientsCurrency('');
    else {
      searchRandomCocktails();
      searchCocktailsCategories();
    }
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { cocktails, isFetchingCocktails } = this.props;
    const firstCocktails = cocktails.slice(zero, maxLength);
    if (isFetchingCocktails) return <Loading />;
    return (
      <div>
        <Header title="Bebidas" />
        <div className="container widthM800 container-fluid d-flex flex-wrap marginB80">
          { firstCocktails.map((cocktail, index) => (
            <CocktailCard
              key={ index }
              cocktail={ cocktail }
              index={ index }
              testid="recipe-card"
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cocktails: state.cocktails.cocktails,
  ingredientCurrency: state.cocktails.ingredientCurrency,
  isFetchingCocktails: state.cocktails.isFetchingCocktails,
});

const mapDispatchToProps = (dispatch) => ({
  searchCocktailsCategories: () => dispatch(fetchCocktailsCategories()),
  searchRandomCocktails: () => dispatch(fetchRandomCocktails()),
  sendCocktailsIngredientsCurrency:
    (ingredient) => dispatch(setCocktailsIngredientCurrency(ingredient)),
});

Cocktails.propTypes = {
  cocktails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchCocktailsCategories: PropTypes.func.isRequired,
  searchRandomCocktails: PropTypes.func.isRequired,
  ingredientCurrency: PropTypes.string.isRequired,
  sendCocktailsIngredientsCurrency: PropTypes.func.isRequired,
  isFetchingCocktails: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);
