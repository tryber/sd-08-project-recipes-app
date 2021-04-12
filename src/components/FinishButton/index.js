import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getlocalStorage, setLocalStorage } from '../../services/localStorage';

// import { Container } from './styles';

function FinishButton(props) {
  const { checkedInstructions, instructions, id, type, area, category,
    alcoholicOrNot, name, image, tags } = props;
  const history = useHistory();
  // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  const formatterTags = tags && tags.replace(', ', ',').split(',');
  const newDoneRecipe = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate: currentDate,
    tags: formatterTags,
  };

  const goToDoneRecipes = () => {
    const updateFinalized = getlocalStorage('doneRecipes');
    let addNewDoneRecipe = [];
    if (updateFinalized) {
      addNewDoneRecipe = [...updateFinalized, newDoneRecipe];
    } else {
      addNewDoneRecipe = [newDoneRecipe];
    }
    setLocalStorage('doneRecipes', addNewDoneRecipe);
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

FinishButton.defaultProps = {
  tags: '',
  alcoholicOrNot: '',
};

FinishButton.propTypes = {
  checkedInstructions: PropTypes.arrayOf(PropTypes.number).isRequired,
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default FinishButton;
