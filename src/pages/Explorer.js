import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import explorerFood from '../images/mealsIcon.svg';
import explorerDrink from '../images/drinksIcon.svg';

class Explorer extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar" />
        <div
          className="
          widthM800
          widthM360
          mx-auto
          mt-5
          btn-group
          btn-group-lg
          btn-group-toggle
          d-flex
          justify-content-center"
        >
          <Link to="/explorar/comidas">
            <button
              type="button"
              data-testid="explore-food"
              className="btn-explorer btn btn-warning px-1 font-weight-bold"
            >
              <img src={ explorerFood } alt="food" className="img-thumbnail mb-1" />
              Explorar Comidas
            </button>
          </Link>

          <Link to="/explorar/bebidas">
            <button
              type="button"
              data-testid="explore-drinks"
              className="btn-explorer btn btn-warning px-1 font-weight-bold"
            >
              <img src={ explorerDrink } alt="food" className="img-thumbnail mb-1" />
              Explorar Bebidas
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Explorer;
