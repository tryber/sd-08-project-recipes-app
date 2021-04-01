import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import './footer.css';

const Footer = () => {
  const [redirectDrink, setRedirectDrink] = useState(false);
  const [redirectMeal, setRedirectMeal] = useState(false);
  const [redirectExplorer, setRedirectExplorer] = useState(false);

  return (
    <div className="footer" data-testid="footer">
      <div>
        {redirectDrink && <Redirect to="/bebidas" />}
        <button type="button" onClick={ () => setRedirectDrink(true) }>
          <img
            src={ drinkIcon }
            alt="Profile icon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>
      <div>
        {redirectExplorer && <Redirect to="/explorar" />}
        <button type="button" onClick={ () => setRedirectExplorer(true) }>
          <img
            src={ exploreIcon }
            alt="Profile icon"
            data-testid="explore-bottom-btn"
          />
        </button>
      </div>
      <div>
        {redirectMeal && <Redirect to="/comidas" />}
        <button type="button" onClick={ () => setRedirectMeal(true) }>
          <img
            src={ mealIcon }
            alt="Profile icon"
            data-testid="food-bottom-btn"
          />
        </button>
      </div>
    </div>
  );
};

export default Footer;
