import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Context from '../context/Context';

import '../styles/Footer.css';

const Footer = () => {
  const { requestApiData } = useContext(Context);

  return (
    <footer data-testid="footer" className="navbar fixed-bottom footer">
      <Link to="/bebidas">
        <button
          type="button"
          className="btn-footer"
          onClick={ () => requestApiData('thecocktaildb') }
        >
          <img
            src={ drinkIcon }
            alt="ícone drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          className="btn-footer"
        >
          <img
            src={ exploreIcon }
            alt="ícone explorar"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          className="btn-footer"
          onClick={ () => requestApiData('thecocktaildb') }
        >
          <img
            src={ mealIcon }
            alt="ícone receitas"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
};
export default Footer;
