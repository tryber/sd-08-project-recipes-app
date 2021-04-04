import React from 'react';

import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Foods from '../images/mealIcon.svg';
import StyledFooter from '../styles/component/Footer';

const Footer = () => (
  <StyledFooter data-testid="footer">
    <a href="/bebidas" src={ Drinks } data-testid="drinks-bottom-btn">
      <img src={ Drinks } alt="drinks" />
    </a>

    <a href="/explorar" src={ Explore } data-testid="explore-bottom-btn">
      <img src={ Explore } alt="drinks" />
    </a>

    <a href="/comidas" src={ Foods } data-testid="food-bottom-btn">
      <img src={ Foods } alt="drinks" />
    </a>
  </StyledFooter>
);

export default Footer;
