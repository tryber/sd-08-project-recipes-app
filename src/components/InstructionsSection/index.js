import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

// import { Container } from './styles';

function InstructionsSection(props) {
  const { fullRecipe } = props;
  const recipe = fullRecipe[0];
  const ingredientKeys = Object.keys(recipe).filter(
    (key) => key.includes('strIngredient') && recipe[key],
  );
  return (
    <Container className="m-0 p-0">
      <h5>Ingredients</h5>
      <Container className="bg-secondary text-white p-2 mb-2">
        { ingredientKeys.map((instruction, index) => {
          const name = recipe[instruction];
          const measure = recipe[`strMeasure${index + 1}`]
            ? recipe[`strMeasure${index + 1}`]
            : false;
          const finalIngredient = (measure && name) ? `${name} - ${measure}` : name;
          return (
            <p
              key={ name }
              data-testid={ `${index}-ingredient-name-and-measure` }
              className="m-0"
            >
              {finalIngredient}
            </p>
          );
        })}
      </Container>
      <h5>Instructions</h5>
      <Container className="bg-secondary text-white p-2 mb-2">
        <p
          data-testid="instructions"
        >
          {recipe.strInstructions}
        </p>
      </Container>
    </Container>
  );
}

InstructionsSection.propTypes = {
  fullRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default InstructionsSection;
