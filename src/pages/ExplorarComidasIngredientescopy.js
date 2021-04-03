import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardIngredientsFoods from '../components/CardIngredientsFoods';
import getMeals from '../helpers/ingredientsApi';
import { fetchFoodApiByIngredient } from '../helpers';

class ExplorarComidasIngredientes extends React.Component {
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

  async filterByIngrediente(ingrediente) {
    const { filterIngrediente } = this.props;
    const results = await fetchFoodApiByIngredient(ingrediente);
    filterIngrediente(results);
  }

  async fetchIngredients() {
    const response = await getMeals('listIngredient', '');
    this.setState({ ingredients: response.meals });
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
                onClick={ () => this.filterByIngrediente(ingredient.strIngredient) }
              >

                <CardIngredientsFoods
                  index={ index }
                  name={ ingredient.strIngredient }
                  key={ index }
                  isMeal
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
   (ingredient) => dispatch({ type: 'INGREDIENT_FILTER', payload: ingredient }),
});

ExplorarComidasIngredientes.propTypes = {
  filterIngrediente: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExplorarComidasIngredientes);
