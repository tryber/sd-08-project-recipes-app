import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ingredientsIcon from '../images/ingredientsIcon.svg';
import exploreIcon from '../images/exploreOriginIcon.svg';
import surpriseIcon from '../images/surpriseIcon.png';

class MealsExplorer extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar Comidas" />
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
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="btn-favorite-recipes btn btn-warning px-1 font-weight-bold"
            >
              <img
                src={ ingredientsIcon }
                alt="ingredients"
                className="img-thumbnail img-btn-explore"
              />
              Por Ingredientes
            </button>
          </Link>

          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
              className="btn-favorite-recipes btn btn-warning px-1 font-weight-bold"
            >
              <img
                src={ exploreIcon }
                alt="ingredients"
                className="img-thumbnail img-btn-explore"
              />
              Por Local de Origem
            </button>
          </Link>

          <Link to="/comidas/52771">
            <button
              type="button"
              data-testid="explore-surprise"
              className="btn-favorite-recipes btn btn-warning px-1 font-weight-bold"
            >
              <img
                src={ surpriseIcon }
                alt="ingredients"
                className="img-thumbnail img-btn-explore"
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

export default MealsExplorer;
