import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterByArea, foodsOnMount, mealsAreas } from '../../redux/actions';

// import { Container } from './styles';

function DropdownAreas() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mealsAreas());
  }, [dispatch]);

  const filterBySelectOption = ({ target }) => {
    const { value } = target;
    if (value === 'All') {
      dispatch(foodsOnMount());
    } else {
      dispatch(filterByArea(value));
    }
  };

  const { areas, isFetching } = useSelector((state) => state.foods);
  return (
    <Form className="mb-4">
      <Form.Group controlId="countries" className="mb-0">
        <Form.Control
          as="select"
          size="lg"
          onChange={ filterBySelectOption }
          custom
          data-testid="explore-by-area-dropdown"
        >
          <option data-testid="All-option">All</option>
          {!isFetching && areas.map(({ strArea }) => (
            <option key={ strArea } data-testid={ `${strArea}-option` }>
              {strArea}
            </option>))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default DropdownAreas;
