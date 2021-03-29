import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './DrinksByIngredients.css';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
import { getDrinksAllIngredients } from '../services/getAPIs';
import { DataDrinksContext } from '../context/ContextDrinks';

function DrinksByIngredients() {
  const dataContext = useContext(DataDrinksContext);
  const {
    handleSearchByIngredientsDrink,
    setSearchInputDrink,
  } = dataContext;

  const [drinksIngredients, setDrinksIngredients] = useState([]);
  useEffect(() => {
    async function fetchAllIngredients() {
      const AllIngredients = await getDrinksAllIngredients();
      setDrinksIngredients(AllIngredients);
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
          drinksIngredients.length > sizeOfLength
            ? drinksIngredients
              .slice(startOfSlice, endOfSlice)
              .map((ingredient, index) => (
                <div
                  data-testid={ `${index}-ingredient-card` }
                  className="card-meal"
                  key={ index }
                >
                  <Link
                    to="/bebidas/"
                    onClick={ () => {
                      handleSearchByIngredientsDrink();
                      setSearchInputDrink(`${ingredient.strIngredient1}`);
                    } }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                      alt="thumbnails-drink"
                    />
                  </Link>
                  <h2 data-testid={ `${index}-card-name` }>
                    {ingredient.strIngredient1}
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

export default DrinksByIngredients;
