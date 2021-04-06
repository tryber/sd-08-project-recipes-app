import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import RecipesContext from '../../ContextApi/RecipesContext';

export default function ExplorerCocktailIngredients() {
  const urlIngredientesDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const TWELVE = 12;

  const { searchParam, setSearchParam } = useContext(RecipesContext);
  const [DrinkIngredients, setDrinkIngredients] = useState([]);

  useEffect(() => {
    async function apiIngredientesDrink() {
      const apiIngredientes = await fetch(urlIngredientesDrink)
        .then((json) => json.json())
        .then((data) => data.drinks)
        .catch((error) => console.log(error));

      setDrinkIngredients(apiIngredientes);
    }
    apiIngredientesDrink();
  }, []);

  const handleClick = ({ target: { alt } }) => {
    setSearchParam({
      ...searchParam,
      selectedParam: 'ingredient',
      inputSearch: `${alt}`,
    });
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" search="false" />
      <div>
        {
          DrinkIngredients
            ? DrinkIngredients.map((ingredient, index) => (
              index < TWELVE
              && (
                <div
                  key={ `${ingredient.strIngredient}` }
                >
                  <Link to="/bebidas">
                    <button
                      type="button"
                      onClick={ handleClick }
                      data-testid={ `${index}-ingredient-card` }
                    >
                      <img
                        alt={ ingredient.strIngredient1 }
                        data-testid={ `${index}-card-img` }
                        src={
                          `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`
                        }
                      />
                      <p data-testid={ `${index}-card-name` }>
                        {ingredient.strIngredient1}
                      </p>
                    </button>
                  </Link>
                </div>
              )
            ))
            : <p>Loading...</p>
        }
      </div>
      <Footer />
    </div>
  );
}
