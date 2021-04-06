import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    const arr = [];
    return (
      <div className="icons d-flex p-2 bd-highlight" data-testid="footer">
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            alt="searchIcon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">

          <img
            src={ mealIcon }
            alt="mealIcon"
            data-testid="food-bottom-btn"
          />
        </Link>
        {arr.map((item) => item)}
      </div>
    );
  }
}

export default Footer;
