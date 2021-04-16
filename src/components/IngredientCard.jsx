import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  actionThunkIngredientsFoods,
  actionThunkIngredientsDrinks,
} from '../redux/actions/index';

const IngredientCard = ({ imagePath, title, index, page }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (page === 'comidas') {
      dispatch(actionThunkIngredientsFoods(title));
    } else if (page === 'bebidas') {
      dispatch(actionThunkIngredientsDrinks(title));
    }
    history.push(`/${page}`);
  };
  return (
    <section
      key={ title }
      className="card"
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleClick }
      onKeyPress={ handleClick }
      role="button"
      tabIndex={ 0 }
    >
      <img src={ imagePath } alt={ title } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` } className="card-title">{title}</p>
    </section>
  );
};

IngredientCard.propTypes = {
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
};

export default IngredientCard;
