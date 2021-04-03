import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardIngredientsDrinks from '../components/CardIngredientsDrinks';
import getDrinks from '../helpers/drinkApi';
import { fetchDrinkApiByIngredient } from '../helpers';

class ExplorarBebidasIngredientescopy extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: '',
      zero: 0,
      twelve: 12,
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  async fetchIngredients() {
    const response = await getDrinks('listIngredient', '');
    this.setState({ ingredients: response.drinks });
  }

  async filterByIngrediente(ingrediente) {
    console.log(ingrediente);
    const { filterIngrediente } = this.props;
    const results = await fetchDrinkApiByIngredient(ingrediente);
    console.log(results);
    filterIngrediente(results);
  }

  render() {
    const { ingredients, zero, twelve } = this.state;
    return (
      <div>
        <Header title="Explorar Ingredientes" />
        { (ingredients.length > zero)
&& ingredients.map((ingredient, index) => {
  if (index < twelve) {
    return (
      <button
        type="button"
        onClick={ () => this.filterByIngrediente(ingredient.strIngredient1) }
        // this.filterByIngrediente(ingredient.strIngredient)
      >
        <CardIngredientsDrinks
          index={ index }
          name={ ingredient.strIngredient1 }
          key={ index }
          isMeal={ false }
        />
      </button>
    );
  }
  return null;
})}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  filterIngrediente:
   (ingredient) => dispatch({ type: 'DRINKS_INGREDIENT_FILTER', payload: ingredient }),
});

ExplorarBebidasIngredientescopy.propTypes = {
  filterIngrediente: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExplorarBebidasIngredientescopy);
