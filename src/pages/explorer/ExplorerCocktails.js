import React, { useState, useEffect } from 'react';
import ExploreFoodOrDrink from '../../components/ExploreFoodOrDrink';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import fetchDrink from '../../services/CocktailApi';

export default function ExplorerCocktails() {
  const [idName, setIdName] = useState('');

  useEffect(() => {
    async function getId() {
      const id = await fetchDrink('random.php')
        .then((response) => Object.values(response)[0])
        .catch((error) => console.log(error));
      setIdName(id[0].idDrink);
    }
    getId();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" search="false" />
      <ExploreFoodOrDrink
        foodOrDrink="bebidas"
        idName={ idName }
      />
      <Footer />
    </div>
  );
}
