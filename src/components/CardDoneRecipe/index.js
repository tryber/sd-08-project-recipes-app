import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

// import { Container } from './styles';

function CardDoneRecipe(props) {
  const {
    id, type, area, category, alcoholicOrNot,
    name, image, doneDate, tags, index, showAlert,
  } = props;
  const history = useHistory();

  const goToDetailsPage = () => {
    if (type !== 'bebida') {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  };

  const copyUrl = () => {
    let urlRecipe = '';
    if (type === 'comida') {
      urlRecipe = `http://localhost:3000/comidas/${id}`;
    } else {
      urlRecipe = `http://localhost:3000/bebidas/${id}`;
    }
    copy(urlRecipe);
    showAlert(true);
  };

  return (
    <Card style={ { width: '18rem' } } className="my-3">
      <Card.Img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ goToDetailsPage }
      />
      <Card.Body>
        <Row>
          <Col xs="9">
            <Card.Title
              data-testid={ `${index}-horizontal-name` }
              onClick={ goToDetailsPage }
            >
              { name }
            </Card.Title>
          </Col>
          <Col xs="3">
            <input
              type="image"
              src={ shareIcon }
              alt="Share Button"
              className="mr-2"
              data-testid={ `${index}-horizontal-share-btn` }
              width="30px"
              onClick={ copyUrl }
            />
          </Col>
        </Row>
        <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
          { area ? `${area} - ${category}` : alcoholicOrNot }
        </Card.Subtitle>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </Card.Text>
        <Card.Text>
          Tags:
          { tags ? tags.map((tag) => (
            <Badge key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </Badge>
          )) : <Badge data-testid="0-">Não a tags para essa receita</Badge>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

CardDoneRecipe.defaultProps = {
  tags: ['Não a tags para essa receita '],
};

CardDoneRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number.isRequired,
  showAlert: PropTypes.func.isRequired,
};
export default CardDoneRecipe;
