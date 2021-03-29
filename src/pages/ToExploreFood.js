import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ToExploreFood.css';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
import { getRandomMeal } from '../services/getAPIs';

function ToExploreFood() {
  const [randomMeal, setRandomMeal] = useState('');
  useEffect(() => {
    async function fetchRandomMeal() {
      const gettingRandomMeal = await getRandomMeal();
      setRandomMeal(gettingRandomMeal);
    }
    fetchRandomMeal();
  }, []);

  return (
    <div className="container">
      <HeaderSimple />
      <div className="main">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link data-testid="explore-by-area" to="/explorar/comidas/area">
          Por Local de Origem
        </Link>

        <Link
          data-testid="explore-surprise"
          to={ `/comidas/${randomMeal.idMeal}` }
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ToExploreFood;
