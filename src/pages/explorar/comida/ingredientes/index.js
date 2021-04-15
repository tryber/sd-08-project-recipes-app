import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header';
import Footer from '../../../../components/footer';
import { requestIngredientsMeal } from '../../../../services/API';
import GlobalContext from '../../../../context/globalContext/GlobalContext';

function ComidaIngredientes() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsImages, setIngredientsImages] = useState([]);
  const { functions: { handleExploreIngredients } } = useContext(GlobalContext);

  const mountImage = (array) => {
    const path = 'https://www.themealdb.com/images/ingredients/';
    const ingredientsNames = array.map((item) => item);
    const correctPaths = ingredientsNames
      .map((item) => `${path}${item}-Small.png`);
    setIngredientsImages(correctPaths);
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      const result = await requestIngredientsMeal();
      const maxIngredients = 12;
      const listIngredients = [];
      for (let i = 0; i < maxIngredients; i += 1) {
        listIngredients.push(result.meals[i].strIngredient);
      }
      setIngredients(listIngredients);
      mountImage(listIngredients);
    };
    fetchIngredients();
  }, []);

  return (
    <>
      <Header explore="false">Explorar Ingredientes</Header>
      <section className="search-results-container">
        {ingredients && ingredients.map((ingredient, index) => (
          <button
            key={ ingredient }
            type="button"
            onClick={ handleExploreIngredients }
            className="page-buttons search-results"
          >
            <Link to="/comidas" type="button">
              <div data-testid={ `${index}-ingredient-card` }>
                <img
                  src={ ingredientsImages[index] }
                  alt={ ingredient }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>
                  { ingredient }
                </p>
              </div>
            </Link>
          </button>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default ComidaIngredientes;
