import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import {
  fetchRandomMeals,
  fetchMealsCategories,
  setMealsIngredientCurrency,
} from '../actions/meals';
import Loading from '../components/Loading';

class Meals extends Component {
  componentDidMount() {
    const {
      searchMealsCategories,
      searchRandomMeals,
      ingredientCurrency,
      sendMealsIngredientsCurrency,
    } = this.props;
    if (ingredientCurrency !== '') sendMealsIngredientsCurrency('');
    else {
      searchRandomMeals();
      searchMealsCategories();
    }
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { meals, isFetchingMeals } = this.props;
    const firstMeals = meals.slice(zero, maxLength);
    if (isFetchingMeals) return <Loading />;
    return (
      <div>
        <Header title="Comidas" />
        <div className="container widthM800 container-fluid d-flex flex-wrap marginB80">
          { firstMeals.map((meal, index) => (
            <MealCard key={ index } meals={ meal } index={ index } testid="recipe-card" />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
  ingredientCurrency: state.meals.ingredientCurrency,
  isFetchingMeals: state.meals.isFetchingMeals,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsCategories: () => dispatch(fetchMealsCategories()),
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
  sendMealsIngredientsCurrency:
    (ingredient) => dispatch(setMealsIngredientCurrency(ingredient)),
});

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  searchMealsCategories: PropTypes.func.isRequired,
  searchRandomMeals: PropTypes.func.isRequired,
  ingredientCurrency: PropTypes.string.isRequired,
  sendMealsIngredientsCurrency: PropTypes.func.isRequired,
  isFetchingMeals: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
