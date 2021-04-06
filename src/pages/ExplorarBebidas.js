import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import { requestRadomDrinks } from '../services/apiRequests';

function ExplorarBebidas() {
  const [drinkId, setDrinkId] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const requestById = async () => {
      const drink = await requestRadomDrinks();
      setDrinkId(drink[0].idDrink);
    };
    requestById();
  }, []);

  return (
    <>
      <HeaderWithoutSearch />
      <main className="explore-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explorar/bebidas/ingredientes');
          } }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => {
            history.push(`/bebidas/${drinkId}`);
          } }
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
