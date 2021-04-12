import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import {
  toggleButtonSearch,
  getDrinks,
  getMeals,
  getDrinksCategoriesFilter,
  getMealsCategoriesFilter,
} from '../../store/actions';
import SearchBar from './SearchBar';
import CardsButtonsCategories from './CardsButtonsCategories';

import '../../styles/components/Header/index.css';

const MAX_LENGTH_NAMES_CATEGORIES = 5;
const hasSearch = ['Comidas', 'Bebidas', 'Explorar Origem'];
class Header extends Component {
  render() {
    const {
      title,
      btnCategories,
      getBtnMealsAll,
      getBtnDrinksAll,
      showButtonSearch,
      setToggle,
    } = this.props;

    return (
      <header className="headerContainer">
        <div>
          <p data-testid="profile-email">email@mail.com</p>

          <div>
            <Link to="/perfil">
              <img
                className="headerButton"
                data-testid="profile-top-btn"
                src={ ProfileIcon }
                alt="perfil"
              />
            </Link>
          </div>
          <div>
            <h1 data-testid="page-title">{title}</h1>
          </div>
          {hasSearch.includes(title) && (
            <div>
              <button
                className="headerButton"
                type="button"
                onClick={ () => setToggle() }
              >
                <img
                  data-testid="search-top-btn"
                  src={ SearchIcon }
                  alt="search"
                />
              </button>
            </div>
          )}
        </div>

        {showButtonSearch && (title === 'Comidas' || title === 'Bebidas') && (
          <SearchBar title={ title } />
        )}

        {!showButtonSearch && (title === 'Comidas' || title === 'Bebidas') && (
          <div>
            <button
              data-testid="All-category-filter"
              type="button"
              onClick={ () => (title === 'Comidas'
                ? getBtnMealsAll()
                : getBtnDrinksAll()) }
            >
              All
            </button>
            {btnCategories
              .slice(0, MAX_LENGTH_NAMES_CATEGORIES)
              .map(({ strCategory }, index) => (
                <CardsButtonsCategories
                  key={ index }
                  strCategory={ strCategory }
                  title={ title }
                />
              ))}
          </div>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  setToggle: PropTypes.func.isRequired,
  getBtnMealsAll: PropTypes.func.isRequired,
  getBtnDrinksAll: PropTypes.func.isRequired,
  showButtonSearch: PropTypes.bool.isRequired,
  btnCategories: PropTypes.arrayOf(PropTypes.objectOf),
};

Header.defaultProps = {
  btnCategories: [],
};

const mapStateToProps = (state) => ({
  showButtonSearch: state.headerReducer.showButtonSearch,
  foodButtons: state.headerReducer.foodsButtonsFilter,
});

const mapDispatchToProps = (dispatch) => ({
  setToggle: () => dispatch(toggleButtonSearch()),
  getFoodFilter: (category) => dispatch(getMealsCategoriesFilter(category)),
  getDrinkFilter: (category) => dispatch(getDrinksCategoriesFilter(category)),
  getBtnMealsAll: () => dispatch(getMeals()),
  getBtnDrinksAll: () => dispatch(getDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
