import React, { useState, useEffect } from 'react';
import ExploreFoodOrDrink from '../../components/ExploreFoodOrDrink';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import fetchFood from '../../services/FoodApi';

export default function ExploreFood() {
  const [idName, setIdName] = useState('');

  useEffect(() => {
    async function getId() {
      const id = await fetchFood('random.php')
        .then((response) => Object.values(response)[0])
        .catch((error) => console.log(error));
      setIdName(id[0].idMeal);
    }
    getId();
  }, []);
  return (
    <div>
      <Header title="Explorar Comidas" search="false" />
      <ExploreFoodOrDrink
        foodOrDrink="comidas"
        idName={ idName }
      />
      <Footer />
    </div>
  );
}
