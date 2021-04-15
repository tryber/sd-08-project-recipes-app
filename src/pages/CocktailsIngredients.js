import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CocktailsIngredientCard from '../components/CocktailsIngredientCard';
import {
  fetchCocktailsIngredients,
  setCocktailsIngredientCurrency,
} from '../actions/cocktails';

class CocktailsIngredients extends Component {
  constructor(props) {
    super(props);
    this.sendIngredient = this.sendIngredient.bind(this);
  }

  componentDidMount() {
    const { searchCocktailsIngredients } = this.props;
    searchCocktailsIngredients();
  }

  sendIngredient(event, ingredient) {
    const { sendCocktailsIngredientsCurrency, history } = this.props;
    sendCocktailsIngredientsCurrency(ingredient.strIngredient1);
    history.push('/bebidas');
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { cocktailsIngredients } = this.props;
    const firstIngredients = cocktailsIngredients.slice(zero, maxLength);
    return (
      <div>
        <Header title="Explorar Ingredientes" />
        <div
          className="
          container
          container-fluid
          d-flex
          flex-wrap
          widthM360
          widthM800
          justify-content-center
          p-0 ingredients-container"
        >
          { firstIngredients.map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              onClick={ (event) => this.sendIngredient(event, ingredient) }
              className="btn p-0"
            >
              <CocktailsIngredientCard
                key={ index }
                ingredient={ ingredient }
                index={ index }
              />
            </button>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({
  cocktailsIngredients: cocktails.cocktailsIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  searchCocktailsIngredients: () => dispatch(fetchCocktailsIngredients()),
  sendCocktailsIngredientsCurrency:
    (ingredient) => dispatch(setCocktailsIngredientCurrency(ingredient)),
});

CocktailsIngredients.propTypes = {
  cocktailsIngredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchCocktailsIngredients: PropTypes.func.isRequired,
  sendCocktailsIngredientsCurrency: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CocktailsIngredients);
