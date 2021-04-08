import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

// import { Container } from './styles';

function FilterTypeButton(props) {
  const { currentFilter, setCurrentFilter } = props;
  const TYPE_BUTTON_ARRAY = [
    {
      name: 'All',
      dataTestId: 'all',
    },
    {
      name: 'Food',
      dataTestId: 'food',
    },
    {
      name: 'Drinks',
      dataTestId: 'drink',
    },
  ];

  return (
    <ButtonGroup toggle className="mb-2 d-flex flex-wrap">
      {
        TYPE_BUTTON_ARRAY.map(({ name, dataTestId }) => (
          <ToggleButton
            key={ name }
            type="checkbox"
            variant="light"
            className="border-warning"
            checked={ currentFilter === name }
            data-testid={ `filter-by-${dataTestId}-btn` }
            onChange={ () => setCurrentFilter(name) }
            size="lg"
          >
            { name }
          </ToggleButton>
        ))
      }
    </ButtonGroup>
  );
}

FilterTypeButton.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
};
export default FilterTypeButton;
