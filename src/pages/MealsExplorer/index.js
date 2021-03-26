import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function MealsExplorer() {
  const [randomMealId, setRandomMealId] = useState('');

  useEffect(() => {
    async function getRandomMealId() {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const response = await data.json();
      const mealId = response.meals[0].idMeal;
      setRandomMealId(mealId);
    }
    getRandomMealId();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomMealId}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
