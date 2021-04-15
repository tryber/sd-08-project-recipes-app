import React from 'react';
import { useHistory } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const history = useHistory();
  const BOOLEAN_TRUE = true;

  async function getRandomRecipe() {
    const result = await getResultFromAPI('/bebidas', 'random');
    const resultId = result[0].idDrink;
    history.push(`../bebidas/${resultId}`);
  }

  return (
    <div>
      <Header title="Explorar Bebidas" disableBtn={ BOOLEAN_TRUE } />
      <section className="explore-container">
        <Button
          type="button"
          label="Por Ingredientes"
          datatestid="explore-by-ingredient"
          onClick={ () => history.push('bebidas/ingredientes') }
        />
        <Button
          type="button"
          label="Me Surpreenda!"
          datatestid="explore-surprise"
          onClick={ () => getRandomRecipe() }
        />
      </section>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
