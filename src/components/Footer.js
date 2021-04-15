import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    return (
      <div
        data-testid="footer"
        className="footerContainer
        container
        position-fixed
        fixed-bottom
        mx-auto
        d-flex
        justify-content-center
        white80 widthM800"
      >
        <Link to="/bebidas">
          <button
            type="button"
            data-testid="drinks-bottom-btn"
            className="footerButton btn mx-3"
            src={ drinkIcon }
          >
            <img src={ drinkIcon } alt="Menu de bebidas" />
          </button>
        </Link>

        <Link to="/explorar">
          <button
            type="button"
            data-testid="explore-bottom-btn"
            className="footerButton btn mx-3"
            src={ exploreIcon }
          >
            <img src={ exploreIcon } alt="Menu de exploração" />
          </button>
        </Link>

        <Link to="/comidas">
          <button
            type="button"
            data-testid="food-bottom-btn"
            className="footerButton btn mx-3"
            src={ mealIcon }
          >
            <img src={ mealIcon } alt="Menu de comidas" />
          </button>
        </Link>
      </div>
    );
  }
}

export default Footer;
