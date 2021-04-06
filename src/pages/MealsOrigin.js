import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchMealsAreas,
  fetchMealsByAreas,
  fetchRandomMeals,
} from '../actions/meals';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';

class MealsOrigin extends React.Component {
  componentDidMount() {
    const { searchMealsAreas, searchRandomMeals } = this.props;
    searchMealsAreas();
    searchRandomMeals();
  }

  render() {
    const { mealsAreas, meals, searchMealsByArea } = this.props;
    const areas = mealsAreas.map((meal) => (meal.strArea)).sort();
    const zero = 0;
    const max = 12;
    const firstMeals = meals.slice(zero, max);
    return (
      <div>
        <Header title="Explorar Origem" />
        <div>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ ({ target }) => searchMealsByArea(target.value) }
          >
            <option
              data-testid="All-option"
              value="All"
            >
              All
            </option>
            {areas.map((strArea) => (
              <option
                value={ strArea }
                key={ strArea }
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
            ))}
          </select>
        </div>
        <div>
          { firstMeals.map((meal, index) => (
            <MealCard key={ index } meals={ meal } index={ index } testid="recipe-card" />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

MealsOrigin.propTypes = {
  mealsAreas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchMealsAreas: PropTypes.func.isRequired,
  searchRandomMeals: PropTypes.func.isRequired,
  searchMealsByArea: PropTypes.func.isRequired,
};

const mapStateToProps = ({ meals }) => ({
  mealsAreas: meals.mealsAreas,
  meals: meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsAreas: () => dispatch(fetchMealsAreas()),
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
  searchMealsByArea: (area) => dispatch(fetchMealsByAreas(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsOrigin);
