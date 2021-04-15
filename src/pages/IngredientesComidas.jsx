import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import contextRecipes from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';

function IngredientesComidas() {
  const BOOLEAN_TRUE = true;
  const history = useHistory();
  const { setMain } = useContext(contextRecipes);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredientsFromAPI() {
      const ingredientList = await getResultFromAPI('/comidas', 'list', 'i=list');
      setIngredients(ingredientList);
    }
    getIngredientsFromAPI();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" disableBtn={ BOOLEAN_TRUE } />
      <section className="recipe-list">
        { ingredients.map((data, index) => (
          <button
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => setMain(data.strIngredient) || history.push('../../comidas') }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${data.strIngredient}-Small.png` }
              alt="ingrediente"
              name={ data.strIngredient }
              width="100%"
            />
            <p data-testid={ `${index}-card-name` }>{ data.strIngredient }</p>
          </button>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default IngredientesComidas;
