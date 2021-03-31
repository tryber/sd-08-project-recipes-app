import React from 'react';
import './ToExplore.css';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';

function ToExplore() {
  const history = useHistory();
  return (
    <div className="container">
      <HeaderSimple />
      <div className="main">
        <button
          data-testid="explore-food"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default ToExplore;
