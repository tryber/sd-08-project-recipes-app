import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

const ListIngredients = ({ object }) => {
  const renderIngredientList = () => {
    const listKeys = Object.keys(object);
    const ingredients = listKeys.filter((key) => key.includes('strIngredient'));

    const listKeysMeasure = Object.keys(object);
    const measures = listKeysMeasure.filter((key) => key.includes('strMeasure'));

    return ingredients.map((ingredient, index) => {
      if (object[ingredient]) {
        return (
          <ListGroup.Item
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${object[ingredient]} - ${object[measures[index]]}`}
          </ListGroup.Item>);
      }
      return true;
    });
  };

  return (
    <ListGroup>
      Ingredientes:
      {renderIngredientList()}
    </ListGroup>
  );
};

ListIngredients.propTypes = {
  title: PropTypes.string.isRequired,
  object: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.string.isRequired,
};

export default ListIngredients;