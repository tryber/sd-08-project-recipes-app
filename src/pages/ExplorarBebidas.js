import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { surpriseMeAPI } from '../services/API';

function ExplorarBebidas() {
  const history = useHistory();
  const handleClick = (e) => history.push(`/explorar/bebidas/${e.target.name}`);
  const surpriseMe = async () => {
    const callToAPI = await surpriseMeAPI('cocktail');
    const { drinks } = callToAPI;
    const { idDrink } = drinks[0];
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div>
      <Header pageTitle="Explorar Bebidas" />
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

export default ExplorarBebidas;
