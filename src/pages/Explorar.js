import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function Explorar() {
  const history = useHistory();
  return (
    <>
      <HeaderWithoutSearch />
      <main className="explore-container">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => {
            history.push('/explorar/comidas');
          } }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => {
            history.push('/explorar/bebidas');
          } }
        >
          Explorar Bebidas
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Explorar;
