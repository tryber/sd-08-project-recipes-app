import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { surpriseMeAPI } from '../services/API';

function ExplorarComidas() {
  const history = useHistory();
  const handleClick = (e) => history.push(`/explorar/comidas/${e.target.name}`);
  const surpriseMe = async () => {
    const callToAPI = await surpriseMeAPI('meal');
    const { meals } = callToAPI;
    const { idMeal } = meals[0];
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div>
      <Header pageTitle="Explorar Comidas" />
      <section className="g6-section-explorar-comida">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ (e) => handleClick(e) }
          name="ingredientes"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ (e) => handleClick(e) }
          name="area"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => surpriseMe() }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
