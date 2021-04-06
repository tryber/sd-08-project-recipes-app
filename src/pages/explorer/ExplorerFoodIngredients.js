import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import RecipesContext from '../../ContextApi/RecipesContext';

export default function ExplorerFoodIngredients() {
  const TWELVE = 12;

  const { setSearchParam, foodIngredients } = useContext(RecipesContext);

  const handleClick = ({ target: { alt } }) => {
    setSearchParam({
      selectedParam: 'ingredient',
      inputSearch: `${alt}`,
    });
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" search="false" />
      <div>
        {
          foodIngredients
            ? foodIngredients.map((ingredient, index) => (
              index < TWELVE
              && (
                <div
                  key={ `${ingredient.strIngredient}` }
                >
                  <Link to="/comidas">
                    <button
                      type="button"
                      onClick={ handleClick }
                      data-testid={ `${index}-ingredient-card` }
                    >
                      <img
                        alt={ ingredient.strIngredient }
                        data-testid={ `${index}-card-img` }
                        src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                      />
                      <p data-testid={ `${index}-card-name` }>
                        {ingredient.strIngredient}
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
