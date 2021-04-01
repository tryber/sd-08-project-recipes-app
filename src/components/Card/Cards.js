import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const Cards = ({
  title,
  object,
  index,
  testid = '-recipe-card',
  cardTitle = '-card-name',
}) => (
  <Card data-testid={`${index}${testid}`}>
    <Card.Img
      data-testid={`${index}-card-img`}
      variant="top"
      src={title === 'Comidas' ? object.strMealThumb : object.strDrinkThumb}
    />
    <Card.Body>
      <Card.Title data-testid={`${index}${cardTitle}`}>
        {title === 'Comidas' ? object.strMeal : object.strDrink}
      </Card.Title>
    </Card.Body>
  </Card>
);
Cards.propTypes = {
  title: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  object: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.string.isRequired,
};

export default Cards;
