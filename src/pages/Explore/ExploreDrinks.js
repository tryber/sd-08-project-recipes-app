import React, { useState, useEffect } from 'react';
import { Header, Footer, ExploreCard } from '../../component';
import { fetchRandom } from '../../services/apiRequests';

export default function ExploreDrinks() {
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const json = await fetchRandom(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      );
      const drinkId = json.drinks[0].idDrink;

      setId(drinkId);
    };

    fetch();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Bebidas" showSearchButton={ false } />
      <ExploreCard
        cardName="Por Ingredientes"
        cardId="by-ingredient"
        linkTo="/explorar/bebidas/ingredientes"
      />
      <ExploreCard
        cardName="Me Surpreenda!"
        cardId="surprise"
        linkTo={ `/bebidas/${id}` }
      />
      <Footer />
    </>
  );
}
