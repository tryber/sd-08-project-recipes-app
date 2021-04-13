import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class DrinksExplorer extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar Bebidas" />

        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/bebidas/178319">
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>

        <Footer />
      </div>
    );
  }
}

export default DrinksExplorer;
