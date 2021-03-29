import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './EatenByIngredients.css';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
import { getMealsAllIngredients } from '../services/getAPIs';
import { LoginAndFoodContext } from '../context/ContextFood';

function EatenByIngredients() {
  const dataContext = useContext(LoginAndFoodContext);
  const { setSearchInputMeal, handleSearchByIngredients } = dataContext;

  const [mealsIngredients, setMealsIngredients] = useState([]);
  useEffect(() => {
    async function fetchAllIngredients() {
      const AllIngredients = await getMealsAllIngredients();
      setMealsIngredients(AllIngredients);
    }
    fetchAllIngredients();
  }, []);

  const sizeOfLength = 12;
  const startOfSlice = 0;
  const endOfSlice = 12;

  return (
    <div className="container">
      <HeaderSimple />
      <div className="container-card-meal">
        {
          mealsIngredients.length > sizeOfLength
            ? mealsIngredients
              .slice(startOfSlice, endOfSlice)
              .map((ingredient, index) => (
                <div
                  data-testid={ `${index}-ingredient-card` }
                  className="card-meal"
                  key={ ingredient.idIngredient }
                >
                  <Link
                    to="/comidas/"
                    onClick={ () => {
                      handleSearchByIngredients();
                      setSearchInputMeal(`${ingredient.strIngredient}`);
                    } }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                      alt="thumbnails-drink"
                    />
                  </Link>
                  <h2 data-testid={ `${index}-card-name` }>
                    {ingredient.strIngredient}
                  </h2>
                </div>
              ))
            : ''
          // : drinks.map((drinkLess, index) => (
          //   <div
          //     data-testid={ `${index}-recipe-card` }
          //     className="card-meal"
          //     key={ drinkLess.idDrink }
          //   >
          //     <Link to={ `/bebidas/${drinkLess.idDrink}` }>
          //       <img
          //         data-testid={ `${index}-card-img` }
          //         src={ drinkLess.strDrinkThumb }
          //         alt="thumbnails-drink"
          //       />
          //     </Link>
          //     <h2 data-testid={ `${index}-card-name` }>{drinkLess.strDrink}</h2>
          //   </div>
          // ))
        }
      </div>

      <Footer />
    </div>
  );
}

export default EatenByIngredients;
