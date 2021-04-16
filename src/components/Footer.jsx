import React from 'react';

import FooterButton from './FooterButton';
import '../styles/footer.css';
import { exploreIconWhite, mealIconWhite, drinkIconWhite } from '../common/svgStore';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <FooterButton
        src={ drinkIconWhite }
        alt="Ícone Bebidas"
        data-testid="drinks-bottom-btn"
        path="/bebidas"
      />
      <FooterButton
        src={ exploreIconWhite }
        alt="Ícone Explorar"
        data-testid="explore-bottom-btn"
        path="/explorar"
      />
      <FooterButton
        src={ mealIconWhite }
        alt="Ícone Comidas"
        data-testid="food-bottom-btn"
        path="/comidas"
      />
    </footer>
  );
}

export default Footer;
