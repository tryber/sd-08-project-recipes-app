import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './RecipeCard.css';

function RecipeCard({ type, index, recipe, recommendation }) {
  return (
    <Card border="dark" className="card">
      <Link
        to={ `/${type}/${recipe.id}` }
        data-testid={ `${index}-recipe-card` }
      >
        <Card.Img
          className="card-img"
          data-testid={ `${index}-card-img` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <Card.Body className="card-body">
          { recommendation && (
            <Card.Text>
              { type === 'comidas' ? recipe.category : recipe.alcoholicOrNot }
            </Card.Text>) }
          <Card.Title
            className="recipe-name"
            data-testid={
              recommendation ? `${index}-recomendation-title` : `${index}-card-name`
            }
          >
            { recipe.name }
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

RecipeCard.defaultProps = {
  recommendation: false,
};

RecipeCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
  recommendation: PropTypes.bool,
};

export default RecipeCard;
