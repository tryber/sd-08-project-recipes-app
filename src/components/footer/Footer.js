import React from 'react';
import { useHistory } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import '../../styles/main.css';

const Footer = () => {
  const history = useHistory();

  const redirectPages = (path) => {
    history.push(path);
  };

  return (
    <div data-testid="footer" className="footer">
      <button className="imgIcons" type="submit" onClick={ () => redirectPages('/bebidas') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </button>
      <button className="imgIcons" type="submit" onClick={ () => redirectPages('/explorar') }>
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="search icon"
        />
      </button>
      <button className="imgIcons" type="submit" onClick={ () => redirectPages('/comidas') }>
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </button>

    </div>
  );
};

export default Footer;
