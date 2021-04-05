import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Explorer() {
  const history = useHistory();
  const renderExplorerButtons = (foodOrDrink, dataTestId) => (
    <button
      data-testid={ `explore-${dataTestId}` }
      style={ { padding: '5px', margin: '5px' } }
      type="button"
      onClick={ () => history.push(`explorar/${foodOrDrink}`) }
    >
      Explorar
      {' '}
      {foodOrDrink.charAt(0).toUpperCase() + foodOrDrink.slice(1)}
    </button>);
  return (
    <div>
      <Header name="Explorar" icon="false" currentPage="Foods" />
      {renderExplorerButtons('comidas', 'food')}
      <br />
      {renderExplorerButtons('bebidas', 'drinks')}
      <Footer />
    </div>
  );
}

export default Explorer;
