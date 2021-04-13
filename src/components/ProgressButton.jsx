import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import { startRecipe, endRecipe } from '../actions/recipes';
import './ProgressButton.css';

function ProgressButton({ type, id, ingredientsLength }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const inProgress = pathname.split('/')[3] === 'in-progress';
  const { done, start, list } = useSelector((state) => state.recipes);
  const refDone = useRef(done);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (inProgress) {
      dispatch(endRecipe(list[0]));
      return;
    }
    if (!Object.keys(start[type]).includes(id)) {
      dispatch(startRecipe(type, { [id]: [] }));
    }
    history.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    if (refDone.current.length !== done.length) {
      localStorage.setItem('doneRecipes', JSON.stringify(done));
      history.push('/receitas-feitas');
    }
  }, [done]);

  const buttonName = () => {
    if (inProgress) return 'Finalizar Receita';
    if (Object.keys(start[type]).includes(id)) return 'Continuar Receita';
    return 'Iniciar Receita';
  };

  return (
    done.some(
      ({ id: currId, type: currType }) => id === currId && type.startsWith(currType),
    )
          || (
            <Button
              className="start"
              data-testid={ inProgress ? 'finish-recipe-btn' : 'start-recipe-btn' }
              type="button"
              onClick={ handleClick }
              disabled={ inProgress
               && (start[type][id] || []).length !== ingredientsLength }
              block
            >
              { buttonName() }
            </Button>
          )
  );
}

ProgressButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredientsLength: PropTypes.number.isRequired,
};

export default ProgressButton;
