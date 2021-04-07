import React from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';

// import { Container } from './styles';

function CardsDone(props) {
  const { id, type, area, category, alcoholicOrNot, name,
    image, doneDate, tagName, index, ShowAlert } = props;
  const history = useHistory();
  console.log(tagName);
  function copyUrl() {
    let urlSite = '';
    if (type === 'comida') {
      urlSite = `http://localhost:3000/comidas/${id}`;
    } else {
      urlSite = `http://localhost:3000/bebidas/${id}`;
    }
    copy(urlSite);
    ShowAlert(true);
  }
  const goToDetailsPage = () => {
    if (type !== 'bebida') {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
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
          <Col xs="7">
            <Card.Title
              data-testid={ `${index}-horizontal-name` }
              onClick={ goToDetailsPage }
            >
              { name }
            </Card.Title>
          </Col>
          <Col xs="5">
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
        <Card.Subtitle data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </Card.Subtitle>
        <Card.Text data-testid={ `${index}-${tagName[index]}-horizontal-tag` }>
          { tagName[index] }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

CardsDone.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  area: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  ShowAlert: PropTypes.func,
  type: PropTypes.string,
  doneDate: PropTypes.string,
  tagName: PropTypes.arrayOf,
};

CardsDone.defaultProps = {
  area: '',
  alcoholicOrNot: '',
  category: '',
  name: '',
  id: '0',
  image: '',
  type: '',
  doneDate: '',
  ShowAlert: () => console.log('erro'),
  tagName: [],
};
export default CardsDone;
