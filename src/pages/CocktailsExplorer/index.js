import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function CocktailsExplorer() {
  const [randomDrinkId, setRandomDrinkId] = useState('');

  useEffect(() => {
    async function getRandomDrinkId() {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const response = await data.json();
      const drinkId = response.drinks[0].idDrink;
      setRandomDrinkId(drinkId);
    }
    getRandomDrinkId();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomDrinkId}` }>
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
