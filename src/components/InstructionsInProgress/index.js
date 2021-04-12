import React from 'react';
import { Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

// import { Container } from './styles';

function InstructionsInProgress(props) {
  const {
    setCheckedInstructions,
    allData,
    checkedInstructions,
    ingredientKeys,
  } = props;
  const drinkData = allData;
  const keysIngredients = ingredientKeys;
  const instructionChecked = checkedInstructions;
  const verifyOnCheckeds = ({ target }, index) => {
    const { checked } = target;
    if (!checked) {
      const filteredArray = instructionChecked.filter(
        (instructions) => instructions !== index + 1,
      );
      setCheckedInstructions(filteredArray);
    } else {
      setCheckedInstructions([...checkedInstructions, index + 1]);
    }
  };
  return (
    <Container>
      <h5>Ingredients</h5>
      <Container className="bg-secondary text-white p-2 mb-2">
        <ul className="m-0 p-0">
          { keysIngredients.map((instruction, index) => {
            const name = drinkData[instruction];
            const measure = drinkData[`strMeasure${index + 1}`]
              ? drinkData[`strMeasure${index + 1}`]
              : false;
            const finalIngredient = (measure && name) ? `${name} - ${measure}` : name;
            const isChecked = instructionChecked.some(
              (checkedInstruction) => checkedInstruction === index + 1,
            );
            return (
              <li
                key={ index }
                style={ { listStyle: 'none' } }
                className="m-0"
                data-testid={ `${index}-ingredient-step` }
              >
                <Form.Check id={ `${index}-checkList` }>
                  <Form.Check.Input
                    type="checkbox"
                    onChange={ (e) => verifyOnCheckeds(e, index) }
                    checked={ isChecked }
                  />
                  {isChecked ? (
                    <Form.Check.Label>
                      <s>
                        {finalIngredient}
                      </s>
                    </Form.Check.Label>
                  ) : (
                    <Form.Check.Label>
                      {finalIngredient}
                    </Form.Check.Label>
                  )}
                </Form.Check>
              </li>
            );
          })}
        </ul>
      </Container>
      <h5>Instructions</h5>
      <Container className="bg-secondary text-white p-2 mb-2">
        <p
          data-testid="instructions"
        >
          {drinkData.strInstructions}
        </p>
      </Container>
    </Container>
  );
}

InstructionsInProgress.propTypes = {
  checkedInstructions: PropTypes.arrayOf(PropTypes.number).isRequired,
  allData: PropTypes.shape({
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  setCheckedInstructions: PropTypes.func.isRequired,
  ingredientKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default InstructionsInProgress;
