import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import { getRandomDrink } from '../helpers';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const handleGetDrink = async () => {
    console.log('drink');
    const result = await getRandomDrink();
    if (result) {
      setRandomDrink(result.drinks[0].idDrink);
      console.log(randomDrink);
    }
  };

  useEffect(() => {
    handleGetDrink();
  }, []);

  return (
    <div>
      <HeaderLocation title="Explorar Bebidas" />
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/bebidas/${randomDrink}` }
          onClick={ handleGetDrink }
        >
          Me Surpreenda!
        </Link>

      </div>
      <Footer />
    </div>
  );
}
