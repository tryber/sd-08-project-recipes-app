import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div>
        <Link to="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="profile-icon" />
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="profile-icon" />
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="profile-icon" />
        </Link>
      </div>
    </footer>
  );
}
