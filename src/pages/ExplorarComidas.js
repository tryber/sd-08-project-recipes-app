import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import { getRandomFood } from '../helpers';

export default function ExploreFoods() {
  const [randomFood, setRandomFood] = useState();
  const handleGetFood = async () => {
    console.log('food');
    const result = await getRandomFood();
    if (result) {
      setRandomFood(result.meals[0].idMeal);
      console.log(randomFood);
    }
  };

  useEffect(() => {
    handleGetFood();
  }, []);

  return (
    <div>
      <HeaderLocation />
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/comidas/${randomFood}` }
          onClick={ handleGetFood }
        >
          Me Surpreenda!
        </Link>

      </div>
      <Footer />
    </div>
  );
}
