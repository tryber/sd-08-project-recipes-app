import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './cards.css';

const Cards = ({
  title,
  object,
  index,
  testid = '-recipe-card',
  cardTitle = '-card-name',
  refCard,
}) => {
  if (refCard === 'ingredients') {
    // console.log(object)
    // console.log(object.strIngredient)
    return (
      <>
        <Card
          className="card-ingredient"
          data-testid={`${index}-ingredient-card`}
        >
          <Card.Img
            data-testid={`${index}-card-img`}
            className="card-ingredient-image"
            src={
              title === 'Explorar Ingredientes de Comidas'
                ? `https://www.themealdb.com/images/ingredients/${object.strIngredient}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${object.strIngredient1}-Small.png`
            }
          />
          <Card.Body>
            <Card.Title
              className="card-title"
              data-testid={`${index}-card-name`}
            >
              {title === 'Explorar Ingredientes de Comidas'
                ? object.strIngredient
                : object.strIngredient1}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return (
      <Card data-testid={`${index}${testid}`}>
        <Card.Img
          data-testid={`${index}-card-img`}
          variant="top"
          src={title === 'Comidas' ? object.strMealThumb : object.strDrinkThumb}
        />
        <Card.Body>
          <Card.Title data-testid={`${index}${cardTitle}`} className="card-title">
            {title === 'Comidas' ? object.strMeal : object.strDrink}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
};
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
