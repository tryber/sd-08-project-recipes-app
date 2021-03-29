import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ToExploreDrinks.css';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
import { getRandomDrinks } from '../services/getAPIs';

function ToExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState('');
  useEffect(() => {
    async function fetchRandomDrink() {
      const gettingRandomDrink = await getRandomDrinks();
      setRandomDrink(gettingRandomDrink);
    }
    fetchRandomDrink();
  }, []);

  return (
    <div className="container">
      <HeaderSimple />
      <div className="main">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/bebidas/${randomDrink.idDrink}` }
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ToExploreDrinks;
