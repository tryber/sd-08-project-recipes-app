import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import { requestRadomRecipe } from '../services/apiRequests';

function ExplorarComidas() {
  const [mealsId, setMealsId] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const requestById = async () => {
      const meals = await requestRadomRecipe();
      console.log('test:', meals[0].idMeal);
      setMealsId(meals[0].idMeal);
    };
    requestById();
  }, []);

  return (
    <>
      <HeaderWithoutSearch />
      <main className="explore-food-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explorar/comidas/ingredientes');
          } }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => {
            history.push('/explorar/comidas/area');
          } }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => {
            history.push(`/comidas/${mealsId}`);
          } }
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </>
  );
}

export default ExplorarComidas;
