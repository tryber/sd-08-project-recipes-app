import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../core/RecipesContext';

function MainIngredientCard({ ingredientsData, index }) {
  const {
    setByIngredient,
    setIngredientName,
  } = useContext(RecipesContext);
  const { strIngredient } = ingredientsData;
  return (
    <div>
      <div
        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png
        ` }
        data-testid={ `${index}-ingredient-card` }
        className="MainCard"
      >
        <Link
          onClick={ () => {
            setByIngredient(true);
            setIngredientName(strIngredient);
          } }
          to="/comidas"
        >
          <img
            data-testid={ `${index}-card-img` }
            className="img"
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png
        ` }
            alt={ strIngredient }
          />
        </Link>
        <Link
          onClick={ () => {
            setByIngredient(true);
            setIngredientName(strIngredient);
          } }
          to="/comidas"
        >
          <p
            data-testid={ `${index}-card-name` }
          >
            {strIngredient}
          </p>
        </Link>
      </div>
    </div>
  );
}

MainIngredientCard.propTypes = {
  ingredientsData: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default MainIngredientCard;
