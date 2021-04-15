import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GlobalContext from '../../context/globalContext/GlobalContext';
import '../../index.css';

function CardFood({ foods }) {
  const {
    values: {
      filteredMeals,
    },
  } = useContext(GlobalContext);

  const maxCards = 12;
  const data = (filteredMeals.length === 0) ? foods : filteredMeals;

  if (foods === undefined) return '';

  return (
    <section className="recipe-card-container">
      {data.map(({ strMeal, strMealThumb, idMeal }, index) => {
        if (index >= maxCards) return '';
        return (
          <Link
            src={ strMealThumb }
            to={ `/comidas/${idMeal}` }
            key={ strMeal }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          </Link>
        );
      })}
    </section>
  );
}

CardFood.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardFood;
