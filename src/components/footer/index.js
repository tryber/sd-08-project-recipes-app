import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link src={ drinkIcon } to="/bebidas" data-testid="drinks-bottom-btn">
        <img
          alt=""
          src={ drinkIcon }
        />
      </Link>
      <Link src={ exploreIcon } to="/explorar" data-testid="explore-bottom-btn">
        <img
          alt=""
          src={ exploreIcon }
        />
      </Link>
      <Link src={ mealIcon } to="/comidas" data-testid="food-bottom-btn">
        <img
          alt=""
          src={ mealIcon }
        />
      </Link>
    </footer>
  );
}
