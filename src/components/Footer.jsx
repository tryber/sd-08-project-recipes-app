import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <div
      data-testid="footer"
      className="footer"
    >
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="Ícone de comidas"
          data-testid="food-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="Ícone de explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="Ícone de bebidas"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
