import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Food.css';
import { LoginAndFoodContext } from '../context/ContextFood';
import Footer from '../components/Footer';
import HeaderSearchBar from '../components/HeaderSearchBar';

function Food() {
  const dataContext = useContext(LoginAndFoodContext);
  const { meals, categoriesMeals, handleByCategoryMeal } = dataContext;
  const sizeOfLength = 12;
  const endOfSliceOfCategories = 5;
  const startOfSlice = 0;
  const endOfSlice = 12;
  return (
    <div className="container">
      <HeaderSearchBar />
      <div className="category-filter">
        <button
          onClick={ () => handleByCategoryMeal('all') }
          data-testid="All-category-filter"
          type="button"
        >
          All
        </button>
        {categoriesMeals
          .slice(startOfSlice, endOfSliceOfCategories)
          .map((category) => (
            <button
              onClick={ () => handleByCategoryMeal(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              key={ category.strCategory }
            >
              {category.strCategory}
            </button>
          ))}
      </div>
      <div className="container-card-meal">
        {meals.length > sizeOfLength
          ? meals.slice(startOfSlice, endOfSlice).map((meal, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-meal"
              key={ meal.idMeal }
            >
              <Link to={ `/comidas/${meal.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt="thumbnails-meal"
                />
              </Link>
              <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
            </div>
          ))
          : meals.map((mealLess, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-meal"
              key={ mealLess.idMeal }
            >
              <Link to={ `/comidas/${mealLess.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ mealLess.strMealThumb }
                  alt="thumbnails-meal"
                />
              </Link>
              <h2 data-testid={ `${index}-card-name` }>{mealLess.strMeal}</h2>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Food;
