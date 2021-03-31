import React from 'react';
import './Footer.css';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="footer-food">
      <button type="button" onClick={ () => history.push('/bebidas') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ DrinkIcon }
          alt="user-profile"
        />
      </button>
      <button type="button" onClick={ () => history.push('/explorar') }>
        <img
          data-testid="explore-bottom-btn"
          src={ ExploreIcon }
          alt="user-profile"
        />
      </button>
      <button type="button" onClick={ () => history.push('/comidas') }>
        <img data-testid="food-bottom-btn" src={ MealIcon } alt="seach-icon" />
      </button>
    </div>
  );
}

export default Footer;
