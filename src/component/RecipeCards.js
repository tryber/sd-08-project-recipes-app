import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import StyledRecipeCards from '../styles/component/RecipeCards';

export default function RecipeCards({ recipe, type, index, id, recommendation }) {
  const history = useHistory();
  const { pathname } = useLocation();
  const link = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  const goToLink = () => history.push(`/${link}/${id}`);

  return (
    <StyledRecipeCards
      onClick={ goToLink }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipe[`str${type}Thumb`] }
        alt={ recipe[`str${type}`] }
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={
          recommendation ? `${index}-recomendation-title` : `${index}-card-name`
        }
      >
        {recipe[`str${type}`]}
      </p>
    </StyledRecipeCards>
  );
}

RecipeCards.defaultProps = {
  recommendation: false,
};

RecipeCards.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recommendation: PropTypes.bool,
};
