import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './styles.css';

class Footer extends Component {
  render() {
    const { className } = this.props;
    const arr = [];
    return (
      <Navbar fixed="bottom" className={className} data-testid="footer">
        <Link className="footer-icons" to="/bebidas">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link className="footer-icons" to="/explorar">
          <img
            src={ exploreIcon }
            alt="searchIcon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link className="footer-icons" to="/comidas">

          <img
            src={ mealIcon }
            alt="mealIcon"
            data-testid="food-bottom-btn"
          />
        </Link>
        {arr.map((item) => item)}
      </Navbar>
    );
  }
}

export default Footer;
