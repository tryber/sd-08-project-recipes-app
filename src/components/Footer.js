import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footerContainer" data-testid="footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="Meals" data-testid="food-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
