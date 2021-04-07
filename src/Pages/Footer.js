import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <Container fluid style={ { bottom: '0', position: 'fixed' } } data-testid="footer">
      <Row
        style={ { backgroundColor: 'lightgray',
          textAlign: 'center',
          justifyContent: 'space-around' } }
      >
        <Nav.Link as={ Link } to="/bebidas">
          <Col>
            <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
          </Col>
        </Nav.Link>
        <Nav.Link as={ Link } to="/explorar">
          <Col>
            <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
          </Col>
        </Nav.Link>
        <Nav.Link as={ Link } to="/comidas">
          <Col>
            <img src={ mealIcon } alt="Comidas" data-testid="food-bottom-btn" />
          </Col>
        </Nav.Link>
      </Row>
    </Container>
  );
}

export default Footer;
