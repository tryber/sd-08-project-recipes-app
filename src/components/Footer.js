import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import styles from '../styles/components/Footer.module.css';

const Footer = () => (
  <footer data-testid="footer" className={ styles.footer }>
    <Link
      to="/bebidas"
      type="button"
    >
      <img
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="Profile Icon"
      />
    </Link>

    <Link
      to="/explorar"
      type="button"
    >
      <img
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="Profile Icon"
      />
    </Link>

    <Link
      to="/comidas"
      type="button"
    >
      <img
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="Profile Icon"
      />
    </Link>
  </footer>
);

export default Footer;
