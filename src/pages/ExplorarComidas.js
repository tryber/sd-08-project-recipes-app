import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';

class ExplorarComidas extends Component {
  render() {
    return (
      <div>
        <HeaderLocation />
        <div>
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/comidas/ingredientes"
          >
            Por Ingredientes
          </Link>
          <Link
            data-testid="explore-by-area"
            to="/explorar/comidas/area"
          >
            Por Local de Origem
          </Link>
          <Link
            data-testid="explore-surprise"
            to="/explorar/comidas"
          >
            Me Surpreenda!
          </Link>

        </div>
        <Footer />
      </div>
    );
  }
}

export default ExplorarComidas;
