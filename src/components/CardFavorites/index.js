import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Card, Col, Row } from 'react-bootstrap';
import copy from 'clipboard-copy';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function CardFavorites(props) {
  const { id, index, area, category, alcoholicOrNot, name,
    image, onClick, ShowAlert, type } = props;
  const history = useHistory();

  const copyUrl = () => {
    let urlRecipe = '';
    if (type === 'comida') {
      urlRecipe = `http://localhost:3000/comidas/${id}`;
    } else {
      urlRecipe = `http://localhost:3000/bebidas/${id}`;
    }
    copy(urlRecipe);
    ShowAlert(false);
  };

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
            <input
              type="image"
              src={ blackHeartIcon }
              alt="Favorite Button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              width="30px"
              onClick={ () => onClick(id, name) }
            />
          </Col>
        </Row>
        <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
          { area ? `${area} - ${category}` : alcoholicOrNot }
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

CardFavorites.defaultProps = {
  area: '',
  alcoholicOrNot: '',
  category: '',
  name: '',
  id: '0',
  image: '',
  type: '',
  onClick: () => console.log('erro'),
  ShowAlert: () => console.log('erro'),
};

CardFavorites.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  area: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  onClick: PropTypes.func,
  ShowAlert: PropTypes.func,
  type: PropTypes.string,
};
export default CardFavorites;
