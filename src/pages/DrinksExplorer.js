import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ingredientsIcon from '../images/ingredientsIcon.svg';
import surpriseIcon from '../images/surpriseIcon.png';

class DrinksExplorer extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar Bebidas" />
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
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="btn-explorer btn btn-warning font-weight-bold"
            >
              <img
                src={ ingredientsIcon }
                alt="ingredients"
                className="img-thumbnail"
              />
              Por Ingredientes
            </button>
          </Link>

          <Link to="/bebidas/178319">
            <button
              type="button"
              data-testid="explore-surprise"
              className="btn-explorer btn btn-warning font-weight-bold"
            >
              <img
                src={ surpriseIcon }
                alt="ingredients"
                className="img-thumbnail"
              />
              Me Surpreenda!
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DrinksExplorer;
