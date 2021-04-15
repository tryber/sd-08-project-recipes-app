import React from 'react';
import { useHistory } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  const history = useHistory();
  const BOOLEAN_TRUE = true;

  async function getRandomRecipe() {
    const result = await getResultFromAPI('/comidas', 'random');
    const resultId = result[0].idMeal;
    history.push(`../comidas/${resultId}`);
  }

  return (
    <div>
      <Header title="Explorar Comidas" disableBtn={ BOOLEAN_TRUE } />
      <section className="explore-container">
        <Button
          type="button"
          label="Por Ingredientes"
          datatestid="explore-by-ingredient"
          onClick={ () => history.push('comidas/ingredientes') }
        />
        <Button
          type="button"
          label="Por Local de Origem"
          datatestid="explore-by-area"
          onClick={ () => history.push('comidas/area') }
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

export default ExplorarComidas;
