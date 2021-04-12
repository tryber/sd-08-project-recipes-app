import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Container } from 'react-bootstrap';
import { useRouteMatch } from 'react-router';

// import { Container } from './styles';

function Recomendations(props) {
  const { recomendations } = props;
  const { path } = useRouteMatch();
  const arrayOfThumbs = (path === '/comidas/:id')
    ? recomendations.map(
      ({ strDrinkThumb }) => strDrinkThumb,
    )
    : recomendations.map(
      ({ strMealThumb }) => strMealThumb,
    );
  const arrayOfNames = (path === '/comidas/:id')
    ? recomendations.map(
      ({ strDrink }) => strDrink,
    )
    : recomendations.map(
      ({ strMeal }) => strMeal,
    );
  return (
    <Container className="mt-3">
      <h5 className="text-center">Recomendações</h5>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-inline-block w-50"
            alt="recomendação 1"
            src={ arrayOfThumbs[0] }
            data-testid="0-recomendation-card"
          />
          <img
            className="d-inline-block w-50"
            alt="recomendação 2"
            src={ arrayOfThumbs[1] }
            data-testid="1-recomendation-card"
          />
          <Carousel.Caption>
            <h5 className="d-inline-block w-50 m-0" data-testid="0-recomendation-title">
              {arrayOfNames[0]}
            </h5>
            <h5 className="d-inline-block w-50 m-0" data-testid="1-recomendation-title">
              {arrayOfNames[1]}
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline-block w-50"
            alt="recomendação 1"
            src={ arrayOfThumbs[2] }
            data-testid="2-recomendation-card"
          />
          <img
            className="d-inline-block w-50"
            alt="recomendação 2"
            src={ arrayOfThumbs[3] }
            data-testid="3-recomendation-card"
          />
          <Carousel.Caption>
            <h5 className="d-inline-block w-50 m-0" data-testid="2-recomendation-title">
              {arrayOfNames[2]}
            </h5>
            <h5 className="d-inline-block w-50 m-0" data-testid="3-recomendation-title">
              {arrayOfNames[3]}
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline-block w-50"
            alt="recomendação 1"
            src={ arrayOfThumbs[4] }
            data-testid="4-recomendation-card"
          />
          <img
            className="d-inline-block w-50"
            alt="recomendação 2"
            src={ arrayOfThumbs[5] }
            data-testid="5-recomendation-card"
          />
          <Carousel.Caption>
            <h5 className="d-inline-block w-50 m-0" data-testid="4-recomendation-title">
              {arrayOfNames[4]}
            </h5>
            <h5 className="d-inline-block w-50 m-0" data-testid="5-recomendation-title">
              {arrayOfNames[5]}
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recomendations;
