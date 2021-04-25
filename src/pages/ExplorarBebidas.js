import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';

class ExplorarBebidas extends Component {
  render() {
    return (
      <div>
        <HeaderLocation title="Explorar Bebidas" />
        <div>
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/bebidas/ingredientes"
          >
            Por Ingredientes
          </Link>
          <Link
            data-testid="explore-surprise"
            to="/explorar/bebidas"
          >
            Me Surpreenda!
          </Link>

        </div>
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebidas;
