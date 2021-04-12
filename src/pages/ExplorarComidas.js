import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Footer from '../components/Footer';
import HeaderP from '../components/HeaderP';
import LinkButton from '../components/LinkButton';
import Context from '../context/Context';

import '../styles/Explorar.css';

function ExplorarComidas({ endpoint }) {
  const { apiReturn, requestRandomRecipe } = useContext(Context);
  const [redirect, setRedirect] = useState(false);

  async function handleClick() {
    await requestRandomRecipe(endpoint);
    setRedirect(true);
  }

  if (redirect) {
    const foodId = apiReturn[0].meals[0].idMeal;
    return <Redirect to={ `/comidas/${foodId}` } />;
  }

  return (
    <>
      <HeaderP title="Explorar Comidas" />
      <main className="explore-main-container">
        <LinkButton
          clas="explore-button"
          path="/explorar/comidas/ingredientes"
          attribute="explore-by-ingredient"
          name="Por Ingredientes"
        />
        <LinkButton
          clas="explore-button"
          path="/explorar/comidas/area"
          attribute="explore-by-area"
          name="Por Local de Origem"
        />
        <button
          className="explore-button"
          data-testid="explore-surprise"
          onClick={ handleClick }
          type="button"
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </>
  );
}

ExplorarComidas.propTypes = {
  endpoint: PropTypes.node.isRequired,
};

export default ExplorarComidas;
