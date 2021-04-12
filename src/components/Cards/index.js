import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './styles.css';
import { useHistory, useRouteMatch } from 'react-router';

function Cards(props) {
  const { name, thumbSrc, index, id } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const goToDetailsPage = () => {
    if (path.includes('comidas')) {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  };
  return (
    <Card className="card mb-3" data-testid={ `${index}-recipe-card` } border="primary">
      <Card.Img
        variant="top"
        className="card-img"
        src={ thumbSrc }
        data-testid={ `${index}-card-img` }
        onClick={ goToDetailsPage }
      />
      <Card.Body
        className="card-body-custom d-flex align-items-center justify-content-center"
      >
        <Card.Title
          data-testid={ `${index}-card-name` }
          className="text-center m-0 h6"
        >
          {name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Cards;

Cards.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbSrc: PropTypes.string.isRequired,
};
