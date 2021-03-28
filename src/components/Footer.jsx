import React from 'react';

import FooterButton from './FooterButton';
import { drinkIcon, exploreIcon, mealIcon } from '../constants/Icons';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <FooterButton
        className="drink-btn"
        src={ drinkIcon }
        alt="Ícone Bebidas"
        data-testid="drinks-bottom-btn"
        path="/bebidas"
      />
      <FooterButton
        src={ exploreIcon }
        alt="Ícone Explorar"
        data-testid="explore-bottom-btn"
        path="/explorar"
      />
      <FooterButton
        className="food-btn"
        src={ mealIcon }
        alt="Ícone Comidas"
        data-testid="food-bottom-btn"
        path="/comidas"
      />
    </footer>
  );
}

export default Footer;
