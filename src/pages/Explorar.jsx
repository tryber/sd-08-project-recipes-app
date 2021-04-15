import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const history = useHistory();
  const BOOLEAN_TRUE = true;
  return (
    <div>
      <Header title="Explorar" disableBtn={ BOOLEAN_TRUE } />
      <section className="explore-container">
        <Button
          type="button"
          label="Explorar Comidas"
          datatestid="explore-food"
          onClick={ () => history.push('explorar/comidas') }
        />
        <Button
          type="button"
          label="Explorar Bebidas"
          datatestid="explore-drinks"
          onClick={ () => history.push('explorar/bebidas') }
        />
      </section>
      <Footer />
    </div>
  );
}

export default Explorar;
