import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';

function FooterButton({ toPage }) {
  const pages = {
    drinks: {
      image: drinkIcon,
      path: '/bebidas',
    },
    explore: {
      image: exploreIcon,
      path: '/explorar',
    },
    food: {
      image: mealIcon,
      path: '/comidas',
    },
  };

  return (
    <Link to={ `${pages[toPage].path}` }>
      <img
        data-testid={ `${toPage}-bottom-btn` }
        src={ pages[toPage].image }
        alt={ `${toPage} icon` }
      />
    </Link>
  );
}

FooterButton.propTypes = {
  toPage: PropTypes.string.isRequired,
};

export default FooterButton;
