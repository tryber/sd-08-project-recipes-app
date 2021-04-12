import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIngredients } from '../../store/actions';
import { Header, Footer, Loading } from '../../components';

import '../../styles/pages/Container.css';

const MAX_SIX_CARDS = 12;
class ExploreIngredientsDrink extends Component {
  componentDidMount() {
    const {
      ingredientsFetcher,
      location: { pathname },
    } = this.props;
    ingredientsFetcher(pathname);
  }

  render() {
    const {
      isFetching,
      ingredients,
    } = this.props;
    return (
      <div>
        <Header title="Explorar Ingredientes" />
        <Loading state={ isFetching }>
          <div className="container">
            {ingredients.slice(0, MAX_SIX_CARDS).map((ingredient, index) => (
              <Link key={ ingredient.idMeal } to={ `/comidas/${ingredient.idMeal}` }>
                <div data-testid={ `${index}-ingredient-card` }>
                  <img
                    src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                    alt={ ingredient.strIngredient1 }
                    data-testid={ `${index}-card-img` }
                  />
                  <span data-testid={ `${index}-card-name` }>
                    {ingredient.strIngredient1}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Loading>
        <Footer />
      </div>
    );
  }
}

ExploreIngredientsDrink.propTypes = {
  ingredients: PropTypes.arrayOf({
    idMeal: PropTypes.string,
    strIngredient: PropTypes.string,
  }).isRequired,
  ingredientsFetcher: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({
  exploreIngredientsReducer: { isFetching, ingredients },
}) => ({
  isFetching,
  ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  ingredientsFetcher: (pathname) => dispatch(getIngredients(pathname)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreIngredientsDrink);
