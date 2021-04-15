import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardIngredientsFoods({ index, name }) {
  const history = useHistory();
  const src = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  const path = '/comidas';

  const searchRecipes = async () => {
    history.push(path);
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
CardIngredientsFoods.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
