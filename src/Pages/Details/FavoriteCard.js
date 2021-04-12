import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copyAlert = (show, setShow) => {
  if (show) {
    return (
      <Alert variant="success" onClose={ () => setShow(false) } dismissible>
        <Alert.Heading>Link copiado!</Alert.Heading>
      </Alert>
    );
  }
};

function FavoriteCard({ favorites, setFavorites, filter }) {
  const [show, setShow] = useState(false);

  const unfavoriteRecipe = (id) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]
      .filter((item) => item.id !== id)));
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <Container>
      {favorites && favorites.length ? favorites
        .filter((recipe) => (filter === 'all' ? true : recipe.type.includes(filter)))
        .map((recipe, i) => {
          const condi = `${recipe.type === 'comida'
            ? 'comidas/' : 'bebidas/'}${recipe.id}`;
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
                <Col className="d-flex justify-content-end align-items-start">
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
                  <Button
                    variant="link"
                    onClick={ () => unfavoriteRecipe(recipe.id) }
                  >
                    <img
                      alt="share"
                      data-testid={ `${i}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                    />
                  </Button>
                </Col>
              </Row>
              {copyAlert(show, setShow)}
            </Card>
          );
        }) : null}
    </Container>
  );
}

FavoriteCard.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filter: PropTypes.string.isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default FavoriteCard;
