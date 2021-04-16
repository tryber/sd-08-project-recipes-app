import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/Explore.css';

function Explore() {
  const history = useHistory();
  return (
    <section className="Explore-main-container">
      <Header />
      <div className="explore-btn-container">
        <button
          onClick={ () => history.push('/explorar/comidas') }
          data-testid="explore-food"
          type="button"
          className="explore-btn regular-button"
        >
          Explorar Comidas
        </button>
        <button
          onClick={ () => history.push('/explorar/bebidas') }
          data-testid="explore-drinks"
          type="button"
          className="explore-btn regular-button"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </section>
  );
}

export default Explore;
