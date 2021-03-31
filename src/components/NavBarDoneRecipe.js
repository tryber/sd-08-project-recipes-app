import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

function NavBarDoneRecipe({ onClickTypeFilter }) {
  return (
    <Row>
      <Col xs={ 12 }>
        <Button
          className="m-2"
          size="md"
          variant="primary"
          data-testid="filter-by-all-btn"
          type="button"
          value="all"
          onClick={ onClickTypeFilter }
        >
          All
        </Button>
        <Button
          className="m-2"
          variant="primary"
          size="md"
          data-testid="filter-by-food-btn"
          type="button"
          value="comida"
          onClick={ onClickTypeFilter }
        >
          Food
        </Button>
        <Button
          className="m-2"
          variant="primary"
          size="md"
          data-testid="filter-by-drink-btn"
          type="button"
          value="bebida"
          onClick={ onClickTypeFilter }
        >
          Drinks
        </Button>
      </Col>
    </Row>
  );
}

NavBarDoneRecipe.propTypes = {
  onClickTypeFilter: PropTypes.func.isRequired,
};

export default NavBarDoneRecipe;
