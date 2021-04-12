import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainCard(props) {
  const { data, index, path } = props;
  const { strMeal, strMealThumb, strDrink, strDrinkThumb } = data;
  return (
    <Link to={ path }>
      <div
        data-testid={ `${index}-recipe-card` }
        className="MainCard"
      >
        <img
          data-testid={ `${index}-card-img` }
          className="img"
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
        />
        <p data-testid={ `${index}-card-name` }>{strMeal || strDrink}</p>
      </div>
    </Link>
  );
}
MainCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};
export default MainCard;
