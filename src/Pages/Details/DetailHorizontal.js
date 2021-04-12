import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function DetailHorizontal({ feitas }) {
  const [show, setShow] = useState(false);

  return (
    <Container>
      {feitas && feitas.length ? feitas.map((recipe, i) => {
        const condi = `${recipe.type === 'comida' ? 'comidas/' : 'bebidas/'}${recipe.id}`;
        return (
          <Card key={ i }>
            <Row>
              <Col>
                <Link to={ condi }>
                  <Card.Img
                    src={ recipe.image }
                    style={ { width: '10rem' } }
                    data-testid={ `${i}-horizontal-image` }
                  />
                </Link>
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title
                    data-testid={ `${i}-horizontal-top-text` }
                  >
                    { `${recipe.type === 'comida' ? recipe.area
                      : recipe.alcoholicOrNot} - ${recipe.category}` }
                  </Card.Title>
                  <Card.Subtitle
                    as={ Link }
                    to={ condi }
                    data-testid={ `${i}-horizontal-name` }
                  >
                    { recipe.name }
                  </Card.Subtitle>
                  <Card.Text
                    data-testid={ `${i}-horizontal-done-date` }
                  >
                    Feita em:
                    { recipe.doneDate }
                  </Card.Text>
                  {recipe.tags && recipe.tags.length > 0 ? recipe.tags.map((tag) => (
                    <Col key={ tag }>
                      <Button
                        variant="secondary"
                        data-testid={ `${i}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </Button>
                    </Col>
                  )) : null}
                </Card.Body>
              </Col>
              <Col>
                <Button
                  variant="link"
                  style={ { width: '3rem' } }
                  onClick={ () => {
                    setShow(true);
                    navigator.clipboard.writeText(`http://localhost:3000/${condi}`);
                  } }
                >
                  <Card.Img
                    data-testid={ `${i}-horizontal-share-btn` }
                    src={ shareIcon }
                  />
                </Button>
              </Col>
            </Row>
            {show && (
              <Alert variant="success" onClose={ () => setShow(false) } dismissible>
                <Alert.Heading>Link copiado!</Alert.Heading>
              </Alert>
            )}
          </Card>
        );
      }) : null}
    </Container>
  );
}

DetailHorizontal.propTypes = {
  feitas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DetailHorizontal;
