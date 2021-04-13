import React from 'react';
import { useHistory } from 'react-router';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleButton = (target) => {
    history.push(`/${target}`);
  };

  return (
    <footer data-testid="footer" className="g6-footer">
      <button
        type="button"
        onClick={ () => handleButton('bebidas') }
        className="g6-footer-button"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ DrinkIcon }
          alt="Bebidas"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleButton('explorar') }
        className="g6-footer-button"
      >
        <img
          data-testid="explore-bottom-btn"
          src={ ExploreIcon }
          alt="Explorar"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleButton('comidas') }
        className="g6-footer-button"
      >
        <img
          data-testid="food-bottom-btn"
          src={ MealIcon }
          alt="Comidas"
        />
      </button>
    </footer>
  );
}

export default Footer;
