import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Footer, Cards, Loading } from '../components';
import { getMealsAll } from '../store/actions';
import '../styles/pages/Container.css';

const MAX_NUMBER_CARDS = 12;

class Foods extends Component {
  componentDidMount() {
    const { asyncMealsAll } = this.props;
    asyncMealsAll();
  }

  render() {
    const { meals,
      isFetching,
      renderOnlyCardByFilter,
      mealsCategories,
    } = this.props;
    if (meals && meals.length === 1 && renderOnlyCardByFilter) {
      return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
    }
    return (
      <div>
        <Header title="Comidas" btnCategories={ mealsCategories } />
        <div className="container">
          <Loading state={ isFetching }>
            { meals.slice(0, MAX_NUMBER_CARDS).map((food, index) => (
              <Cards
                route={ `/comidas/${food.idMeal}` }
                key={ index }
                strThumb={ food.strMealThumb }
                str={ food.strMeal }
                index={ index }
                id={ food.idMeal }
                title="Comidas"
              />
            ))}
          </Loading>
        </div>
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.objectOf),
  mealsCategories: PropTypes.arrayOf(PropTypes.objectOf),
  asyncMealsAll: PropTypes.func.isRequired,
  renderOnlyCardByFilter: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

Foods.defaultProps = {
  meals: [],
  mealsCategories: [],
};

const mapStateToProps = (state) => ({
  meals: state.foodsReducer.recipes,
  mealsCategories: state.foodsReducer.categories,
  renderOnlyCardByFilter: state.headerReducer.showButtonSearch,
  isFetching: state.drinksReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  asyncMealsAll: () => dispatch(getMealsAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
