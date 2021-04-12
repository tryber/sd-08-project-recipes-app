import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer-container" data-testid="footer">
      <button
        onClick={ () => { history.push('/bebidas'); } }
        src="drinkIcon"
        className="main-buttons"
        data-testid="drinks-bottom-btn"
        type="button"
      >
        <img src={ drinkIcon } alt="drinks" />
      </button>
      <button
        onClick={ () => history.push('/explorar') }
        src="exploreIcon"
        className="main-buttons"
        data-testid="explore-bottom-btn"
        type="button"
      >
        <img src={ exploreIcon } alt="explore" />
      </button>
      <button
        onClick={ () => history.push('/comidas') }
        src="mealIcon"
        className="main-buttons"
        data-testid="food-bottom-btn"
        type="button"
      >
        <img src={ mealIcon } alt="meal" />
      </button>
    </footer>
  );
}

export default Footer;
