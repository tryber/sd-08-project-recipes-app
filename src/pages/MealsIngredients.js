import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealsIngredientCard from '../components/MealsIngredientCard';
import {
  fetchMealsIngredients,
  setMealsIngredientCurrency,
} from '../actions/meals';

class MealsIngredients extends Component {
  constructor(props) {
    super(props);
    this.sendIngredient = this.sendIngredient.bind(this);
  }

  componentDidMount() {
    const { searchMealsIngredients } = this.props;
    searchMealsIngredients();
  }

  sendIngredient(event, ingredient) {
    const { sendMealsIngredientsCurrency, history } = this.props;
    sendMealsIngredientsCurrency(ingredient.strIngredient);
    history.push('/comidas');
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { mealsIngredients } = this.props;
    const firstIngredients = mealsIngredients.slice(zero, maxLength);
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
              <MealsIngredientCard
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

const mapStateToProps = ({ meals }) => ({
  mealsIngredients: meals.mealsIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsIngredients: () => dispatch(fetchMealsIngredients()),
  sendMealsIngredientsCurrency:
    (ingredient) => dispatch(setMealsIngredientCurrency(ingredient)),
});

MealsIngredients.propTypes = {
  mealsIngredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchMealsIngredients: PropTypes.func.isRequired,
  sendMealsIngredientsCurrency: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsIngredients);
