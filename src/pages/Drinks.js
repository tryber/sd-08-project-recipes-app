import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Drinks.css';
import { DataDrinksContext } from '../context/ContextDrinks';
import Footer from '../components/Footer';
import HeaderSearchBar from '../components/HeaderSearchBar';

export default function Drinks() {
  const dataContext = useContext(DataDrinksContext);
  const {
    drinks,
    categoriesDrinks,
    handleByCategoryDrink,
  } = dataContext;

  const sizeOfLength = 12;
  const startOfSlice = 0;
  const endOfSlice = 12;
  const endOfSliceOfCategories = 5;
  return (
    <div className="container">
      <HeaderSearchBar />
      <div className="category-filter">
        <button
          onClick={ () => handleByCategoryDrink('all') }
          data-testid="All-category-filter"
          type="button"
        >
          All
        </button>
        {categoriesDrinks
          .slice(startOfSlice, endOfSliceOfCategories)
          .map((category) => (
            <button
              onClick={ () => handleByCategoryDrink(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              key={ category.strCategory }
            >
              {category.strCategory}
            </button>
          ))}
      </div>
      <div className="container-card-meal">
        {drinks.length > sizeOfLength
          ? drinks.slice(startOfSlice, endOfSlice).map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-meal"
              key={ drink.idDrink }
            >
              <Link to={ `/bebidas/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt="thumbnails-drink"
                />
              </Link>
              <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
            </div>
          ))
          : drinks.map((drinkLess, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-meal"
              key={ drinkLess.idDrink }
            >
              <Link to={ `/bebidas/${drinkLess.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drinkLess.strDrinkThumb }
                  alt="thumbnails-drink"
                />
              </Link>
              <h2 data-testid={ `${index}-card-name` }>{drinkLess.strDrink}</h2>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
