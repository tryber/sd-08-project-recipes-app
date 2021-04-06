import { AppBar, Toolbar, Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import drinksIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './MainHeader.css';

const Footer = ({ foodClass }) => (
  <AppBar
    data-testid="footer"
    position="fixed"
    color="primary"
    style={ { top: 'auto',
      bottom: 0 } }
  >
    <Toolbar className={ foodClass }>
      <Link to="/bebidas">
        <Button src={ drinksIcon } type="button" data-testid="drinks-bottom-btn">
          <img src={ drinksIcon } alt="drinksIcon" />
        </Button>
      </Link>
      <Link to="/explorar">
        <Button src={ exploreIcon } type="button" data-testid="explore-bottom-btn">
          <img src={ exploreIcon } alt="exploreIcon" />
        </Button>
      </Link>
      <Link to="/comidas">
        <Button src={ mealIcon } type="button" data-testid="food-bottom-btn">
          <img src={ mealIcon } alt="mealIcon" />
        </Button>
      </Link>
    </Toolbar>
  </AppBar>

);

Footer.propTypes = {
  foodClass: PropTypes.string.isRequired,
};

export default Footer;
