import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

// import { Container } from './styles';

function FinishButton(props) {
  const { checkedInstructions, instructions } = props;
  const history = useHistory();
  const goToDoneRecipes = () => {
    history.push('/receitas-feitas');
  };
  return (
    <Button
      data-testid="finish-recipe-btn"
      variant="success"
      size="lg"
      className="mx-auto mb-2"
      onClick={ goToDoneRecipes }
      style={ { width: '15rem' } }
      disabled={ checkedInstructions.length !== instructions.length }
    >
      Finalizar Receita
    </Button>
  );
}

FinishButton.propTypes = {
  checkedInstructions: PropTypes.arrayOf(PropTypes.number).isRequired,
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FinishButton;
