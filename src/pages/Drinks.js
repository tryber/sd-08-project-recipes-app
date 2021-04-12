import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Footer, Cards, Loading } from '../components';
import { getDrinksAll } from '../store/actions';
import '../styles/pages/Container.css';

const MAX_NUMBER_CARDS = 12;
class Drinks extends Component {
  componentDidMount() {
    const { asyncDrinksAll } = this.props;
    asyncDrinksAll();
  }

  render() {
    const { drinks, drinksCategories, isFetching } = this.props;
    if (drinks.length === 1) {
      return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
    }
    return (
      <div>
        <Header title="Bebidas" btnCategories={ drinksCategories } />
        <div className="container">
          <Loading state={ isFetching }>

            {drinks
              .slice(0, MAX_NUMBER_CARDS)
              .map((drink, index) => (
                <Cards
                  route={ `/bebidas/${drink.idDrink}` }
                  data-testid={ `${index}-recipe-card` }
                  key={ index }
                  strThumb={ drink.strDrinkThumb }
                  str={ drink.strDrink }
                  index={ index }
                  id={ drink.idDrink }
                />
              ))}
          </Loading>
        </div>
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.objectOf),
  drinksCategories: PropTypes.arrayOf(PropTypes.objectOf),
  asyncDrinksAll: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,

};

Drinks.defaultProps = {
  drinks: [],
  drinksCategories: [],
};

const mapStateToProps = (state) => ({
  drinks: state.drinksReducer.recipes,
  drinksCategories: state.drinksReducer.categories,
  isFetching: state.drinksReducer.isFetching,

});

const mapDispatchToProps = (dispatch) => ({
  asyncDrinksAll: (value) => dispatch(getDrinksAll(value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
