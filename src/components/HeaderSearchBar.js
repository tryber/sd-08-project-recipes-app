import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import './HeaderSearchBar.css';
import { LoginAndFoodContext } from '../context/ContextFood';
import { DataDrinksContext } from '../context/ContextDrinks';
import { DataHeaderContext } from '../context/HeaderContext';

function HeaderSearchBar() {
  const headerContext = useContext(DataHeaderContext);
  const drinksContext = useContext(DataDrinksContext);
  const mealsContext = useContext(LoginAndFoodContext);
  const { title } = headerContext;
  const {
    handleChangeSearch,
    handleSearchByIngredients,
    handleSearchByFirstLetter,
    handleSearchByName,
    handleClickSearch,
    nameSearchRadio,
    ingredientSearchRadio,
    firstLetterSearchRadio,
    searchInputMeal,
  } = mealsContext;
  const {
    searchInputDrink,
    handleSearchByNameDrink,
    handleSearchByIngredientsDrink,
    handleSearchByFirstLetterDrink,
    nameSearchRadioDrink,
    ingredientSearchRadioDrink,
    firstLetterSearchRadioDrink,
    handleClickSearchDrink,
    handleChangeSearchDrink,
  } = drinksContext;
  const [isVisible, setIsvisible] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const handleClickTProfile = () => {
    history.push('/perfil');
  };
  const changeVisible = () => {
    setIsvisible(!isVisible);
  };

  return (
    <div className="container-header-search">
      <div className="header">
        <button type="button" onClick={ handleClickTProfile }>
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="user-profile"
          />
        </button>
        <h2 data-testid="page-title">{title}</h2>
        <button type="button" onClick={ changeVisible }>
          <img data-testid="search-top-btn" src={ SearchIcon } alt="seach-icon" />
        </button>
      </div>
      {isVisible && (
        <div className="search">
          <input
            onBlur={
              location.pathname === '/comidas'
                ? (e) => handleChangeSearch(e.target.value)
                : (e) => handleChangeSearchDrink(e.target.value)
            }
            className="search-input"
            data-testid="search-input"
          />
          <div className="search-radios">
            <label htmlFor="ingredient-search-radio">
              <input
                checked={
                  location.pathname === '/comidas'
                    ? ingredientSearchRadio
                    : ingredientSearchRadioDrink
                }
                name="ingredient-search-radio"
                value={
                  location.pathname === '/comidas'
                    ? searchInputMeal
                    : searchInputDrink
                }
                onClick={
                  location.pathname === '/comidas'
                    ? (e) => handleSearchByIngredients(e.target.value)
                    : (e) => handleSearchByIngredientsDrink(e.target.value)
                }
                className="radio"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                type="radio"
              />
              ingrediente
            </label>
            <label htmlFor="name-search-radio">
              <input
                checked={
                  location.pathname === '/comidas'
                    ? nameSearchRadio
                    : nameSearchRadioDrink
                }
                name="name-search-radio"
                value={
                  location.pathname === '/comidas'
                    ? searchInputMeal
                    : searchInputDrink
                }
                onClick={
                  location.pathname === '/comidas'
                    ? (e) => handleSearchByName(e.target.value)
                    : (e) => handleSearchByNameDrink(e.target.value)
                }
                className="radio"
                id="name-search-radio"
                data-testid="name-search-radio"
                type="radio"
              />
              Nome
            </label>
            <label htmlFor="first-letter-search-radio">
              <input
                value={
                  location.pathname === '/comidas'
                    ? searchInputMeal
                    : searchInputDrink
                }
                checked={
                  location.pathname === '/comidas'
                    ? firstLetterSearchRadio
                    : firstLetterSearchRadioDrink
                }
                name="first-letter-search-radio"
                onClick={
                  location.pathname === '/comidas'
                    ? (e) => handleSearchByFirstLetter(e.target.value)
                    : (e) => handleSearchByFirstLetterDrink(e.target.value)
                }
                className="radio"
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                type="radio"
              />
              Primeira letra
            </label>
          </div>
          <div className="exec-search">
            <button
              onClick={
                location.pathname === '/comidas'
                  ? () => handleClickSearch()
                  : () => handleClickSearchDrink()
              }
              type="button"
              className="exec-search-btn"
              data-testid="exec-search-btn"
            >
              Buscar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderSearchBar;
