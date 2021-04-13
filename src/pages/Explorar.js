import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar() {
  const history = useHistory();

  const handleClick = (e) => {
    history.push(`/explorar/${e.target.name}`);
  };

  return (
    <div>
      <Header pageTitle="Explorar" />
      <div className="g6-explore">
        <button
          type="button"
          data-testid="explore-food"
          name="comidas"
          onClick={ handleClick }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          name="bebidas"
          onClick={ handleClick }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}
