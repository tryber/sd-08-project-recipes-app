import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useLocation } from 'react-router';
import components from '../components/index';
import MainCard from '../components/MainCard';
import api from '../services';
import { MAIN_FOOD_CARD_LENGTH_12, CATEGORIES_LENGTH_5 } from '../constants';
import RecipesContext from '../core/RecipesContext';

function Drinks() {
  const { isLoading, drinkData, byIngredient, ingredientName } = useContext(
    RecipesContext,
  );

  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataDrinksCategories, setDataDrinksCategories] = useState([]);
  const [drinkCategorySelected, setDrinkCategorySelected] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(false);
  const location = useLocation();

  function handleClick({ target }) {
    setDrinkCategorySelected(target.value);
    if (
      drinkCategorySelected !== target.value
      && drinkCategorySelected.length > 0
    ) {
      setSelectedDrink(selectedDrink);
    } else {
      setSelectedDrink(!selectedDrink);
    }
  }

  useEffect(() => {
    api
      .fetchCategoriesDrink()
      .then((response) => response.json())
      .then((result) => setDataDrinksCategories(result.drinks
        .slice(0, CATEGORIES_LENGTH_5)));
    if (drinkCategorySelected.length && selectedDrink) {
      api
        .fetchDrinkByCategory(drinkCategorySelected)
        .then((response) => response.json())
        .then((result) => setDataDrinks(result.drinks));
    } else if (byIngredient && ingredientName) {
      api
        .searchByDrinkIngredient(ingredientName)
        .then((response) => response.json())
        .then((result) => setDataDrinks(result.drinks));
    } else {
      api
        .fetchDrinks()
        .then((response) => response.json())
        .then((result) => setDataDrinks(result.drinks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkCategorySelected, selectedDrink]);

  return (
    <div>
      <components.Header title="Bebidas" />
      {isLoading ? <div>Loading</div> : null}
      <div className="drinks-buttons-container">
        <button
          className="btn btn-danger"
          style={ {
            marginTop: '5px',
            marginBottom: '5px',
            width: '163px' } }
          onClick={ () => {
            setDrinkCategorySelected([]);
            setSelectedDrink(false);
          } }
          type="button"
          data-testid="All-category-filter"
        >
          All
        </button>
        {dataDrinksCategories
          .slice(0, CATEGORIES_LENGTH_5)
          .map(({ strCategory }, index) => (
            <button
              className="btn btn-danger"
              style={ { marginTop: 5,
                marginBottom: 5,
                width: 163 } }
              onClick={ handleClick }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ index }
              value={ strCategory }
            >
              {strCategory}
            </button>
          ))}
      </div>
      <div className="home-container">
        {drinkData.length && !selectedDrink
          ? drinkData
            .slice(0, MAIN_FOOD_CARD_LENGTH_12)
            .map((curr, index) => (
              <MainCard
                path={ `${location.pathname}/${curr.idDrink}` }
                key={ index }
                data={ curr }
                index={ index }
                id={ curr.idDrink }
              />
            ))
          : dataDrinks
            .slice(0, MAIN_FOOD_CARD_LENGTH_12)
            .map((drink, index) => (
              <MainCard
                path={ `${location.pathname}/${drink.idDrink}` }
                key={ index }
                data={ drink }
                index={ index }
                id={ drink.idDrink }
              />
            ))}
        {drinkData.length && !selectedDrink && drinkData.length === 1 ? (
          <Redirect to={ `/bebidas/${drinkData[0].idDrink}` } />
        ) : null}
        <components.Footer />
      </div>
    </div>
  );
}

export default Drinks;
