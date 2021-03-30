import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import contextRecipes from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';

function IngredientesBebidas() {
  const BOOLEAN_TRUE = true;
  const history = useHistory();
  const { setMain } = useContext(contextRecipes);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredientsFromAPI() {
      const ingredientList = await getResultFromAPI('/bebidas', 'list', 'i=list');
      setIngredients(ingredientList);
    }
    getIngredientsFromAPI();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" disableBtn={ BOOLEAN_TRUE } />
      { ingredients.map((dat, index) => (
        <div data-testid={ `${index}-ingredient-card` } key={ index }>
          <input
            type="image"
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${dat.strIngredient1}-Small.png` }
            alt="ingrediente"
            name={ dat.strIngredient1 }
            width="100%"
            onClick={ () => setMain(dat.strIngredient1) || history.push('../../bebidas') }
          />
          <p data-testid={ `${index}-card-name` }>{ dat.strIngredient1 }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default IngredientesBebidas;
