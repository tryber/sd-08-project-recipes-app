import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getDrinksCategoriesFilter,
  getMealsCategoriesFilter,
  getDrinks,
  getMeals,
} from '../../store/actions';

class CardsButtonsCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(categoryCurrent) {
    const { category } = this.state;
    const {
      getBtnMealsAll,
      getBtnDrinksAll,
      getMealsFilter,
      getDrinksFilter,
      title,
    } = this.props;
    this.setState({ category: categoryCurrent });
    const isEqualFilter = categoryCurrent === category;
    if (isEqualFilter && title === 'Comidas') return getBtnMealsAll();
    if (title === 'Comidas') return getMealsFilter(categoryCurrent);
    if (isEqualFilter) return getBtnDrinksAll();
    return getDrinksFilter(categoryCurrent);
  }

  render() {
    const { strCategory,
    } = this.props;
    return (
      <button
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        onClick={
          () => this.handleClick(strCategory)
        }
        name={ strCategory }
      >
        {strCategory}
      </button>
    );
  }
}

CardsButtonsCategories.propTypes = {
  title: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  getBtnMealsAll: PropTypes.func.isRequired,
  getBtnDrinksAll: PropTypes.func.isRequired,
  getDrinksFilter: PropTypes.func.isRequired,
  getMealsFilter: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  getMealsFilter: (category) => dispatch(getMealsCategoriesFilter(category)),
  getDrinksFilter: (category) => dispatch(getDrinksCategoriesFilter(category)),
  getBtnMealsAll: () => dispatch(getMeals()),
  getBtnDrinksAll: () => dispatch(getDrinks()),
});

export default connect(null, mapDispatchToProps)(CardsButtonsCategories);
