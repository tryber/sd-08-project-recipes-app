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
    const { cocktails } = this.props;
    const firstCocktails = cocktails.slice(zero, maxLength);
    return (
      <div>
        <Header title="Bebidas" />
        { firstCocktails.map((cocktail, index) => (
          <CocktailCard
            key={ index }
            cocktail={ cocktail }
            index={ index }
            testid="recipe-card"
          />
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({
  cocktails: cocktails.cocktails,
  ingredientCurrency: cocktails.ingredientCurrency,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);
