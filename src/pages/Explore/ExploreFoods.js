import React, { useState, useEffect } from 'react';
import { Header, Footer, ExploreCard } from '../../component';
import { fetchRandom } from '../../services/apiRequests';

export default function ExploreFoods() {
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const json = await fetchRandom(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      );
      const foodId = json.meals[0].idMeal;

      setId(foodId);
    };

    fetch();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Comidas" showSearchButton={ false } />
      <ExploreCard
        cardName="Por Ingredientes"
        cardId="by-ingredient"
        linkTo="/explorar/comidas/ingredientes"
      />
      <ExploreCard
        cardName="Por Local de Origem"
        cardId="by-area"
        linkTo="/explorar/comidas/area"
      />
      <ExploreCard
        cardName="Me Surpreenda!"
        cardId="surprise"
        linkTo={ `/comidas/${id}` }
      />
      <Footer />
    </>
  );
}
