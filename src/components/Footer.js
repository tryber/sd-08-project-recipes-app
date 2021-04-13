import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
      <Row className="footer">
        <Col>
          <Link to="/bebidas">
            <img
              src={ drinkIcon }
              alt="drinks icon"
              data-testid="drinks-bottom-btn"
            />
          </Link>
        </Col>
        <Col>
          <Link to="/explorar">
            <img
              src={ exploreIcon }
              alt="explore icon"
              data-testid="explore-bottom-btn"
            />
          </Link>
        </Col>
        <Col>
          <Link to="/comidas">
            <img
              src={ mealIcon }
              alt="meals icon"
              data-testid="food-bottom-btn"
            />
          </Link>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
