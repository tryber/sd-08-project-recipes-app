import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function CardIngredientsDrinks({ index, name }) {
  const history = useHistory();
  const src = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  const searchRecipes = async () => {
    history.push('/bebidas');
  };
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <center>
        <Image
          alt="Recipe Thumbnail"
          data-testid={ `${index}-card-img` }
          src={ src }
          onClick={ searchRecipes }
          className="imageLink"
          height="150"
          style={ { cursor: 'pointer' } }
        />
        <h6
          data-testid={ `${index}-card-name` }
          style={ { cursor: 'pointer' } }
        >
          {name}
        </h6>
      </center>
    </div>
  );
}
CardIngredientsDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
