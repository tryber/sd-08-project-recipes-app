import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Footer from '../components/Footer';
import HeaderP from '../components/HeaderP';
import LinkButton from '../components/LinkButton';
import Context from '../context/Context';

import '../styles/Explorar.css';

function ExplorarBebidas({ endpoint }) {
  const { apiReturn, requestRandomRecipe } = useContext(Context);
  const [redirect, setRedirect] = useState(false);

  async function handleClick() {
    await requestRandomRecipe(endpoint);
    setRedirect(true);
  }

  if (redirect) {
    const drinkId = apiReturn[0].drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${drinkId}` } />;
  }

  return (
    <>
      <HeaderP title="Explorar Bebidas" />
      <main className="explore-main-container">
        <LinkButton
          clas="explore-button"
          path="/explorar/bebidas/ingredientes"
          attribute="explore-by-ingredient"
          name="Por Ingredientes"
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

ExplorarBebidas.propTypes = {
  endpoint: PropTypes.node.isRequired,
};

export default ExplorarBebidas;
