import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

function FilterButtonsRecipesMade(props) {
  const TYPE_ARRAY = [
    {
      name: 'All',
      dataTestId: 'all' },
    {
      name: 'Food',
      dataTestId: 'food' },
    {
      name: 'Drinks',
      dataTestId: 'drink' }];
  const { currentFilter, setCurrentFilter } = props;
  return (
    <ButtonGroup toggle className="mb-2 d-flex flex-wrap">
      { TYPE_ARRAY.map(({ name, dataTestId }) => (
        <ToggleButton
          type="checkbox"
          variant="light"
          className="border-warning"
          key={ name }
          checked={ currentFilter === name }
          data-testid={ `filter-by-${dataTestId}-btn` }
          onChange={ () => setCurrentFilter(name) }
          size="lg"
        >
          { name }
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

FilterButtonsRecipesMade.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
};

export default FilterButtonsRecipesMade;
