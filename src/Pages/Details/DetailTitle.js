import React, { useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const isFavoriteRecipe = (id) => {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (!favorite) return false;

  return favorite.some((item) => item.id === id);
};

const toggleFavoriteRecipe = (recipeObject) => {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const today = new Date();
  // recipeObject.doneDate = `${today.getDate()}/${today.getMonth()}/${today.getYear()}`;

  if (!favorite) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeObject]));
  } else if (favorite.some((item) => item.id === recipeObject.id)) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite]
      .filter((item) => item.id !== recipeObject.id)));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, recipeObject]));
  }
};

function DetailTitle(props) {
  const { title, cat } = props;
  const [show, setShow] = useState(false);
  const { url } = useRouteMatch();
  const { id } = useParams();
  const [favorite, setFavorite] = useState(isFavoriteRecipe(id));
  const item = useSelector((state) => {
    if (state.api.data.meals) return state.api.data.meals[0];
    if (state.api.data.drinks) return state.api.data.drinks[0];
    return {};
  });

  const recipeObject = {
    id,
    type: item.strMeal ? 'comida' : 'bebida',
    area: item.strArea || '',
    category: item.strCategory || '',
    alcoholicOrNot: item.strAlcoholic || '',
    name: title,
    image: item.strMealThumb || item.strDrinkThumb,
    // tags: item.strTags ? item.strTags.split(',') : [],
  };

  const link = (urlCopy) => {
    if (urlCopy.includes('/in-progress')) {
      const newUrl = `http://localhost:3000${url.replace('/in-progress', '')}`;
      return newUrl;
    }

    return `http://localhost:3000${urlCopy}`;
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 data-testid="recipe-title">{ title }</h1>
          <p data-testid="recipe-category">{ cat }</p>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <Button
            variant="link"
            data-testid="shareBtn"
            onClick={ () => {
              setShow(true);
              navigator.clipboard.writeText(link(url));
            } }
          >
            <img alt="share" data-testid="share-btn" src={ shareIcon } />
          </Button>
          <Button
            variant="link"
            onClick={ () => {
              setFavorite(!favorite);
              return toggleFavoriteRecipe(recipeObject);
            } }
          >
            <img
              alt="share"
              data-testid="favorite-btn"
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
            />
          </Button>
        </Col>
      </Row>
      {show && (
        <Alert variant="success" onClose={ () => setShow(false) } dismissible>
          <Alert.Heading>Link copiado!</Alert.Heading>
        </Alert>
      )}
    </Container>
  );
}

DetailTitle.propTypes = {
  title: PropTypes.string,
  cat: PropTypes.string,
};

DetailTitle.defaultProps = {
  title: '',
  cat: '',
};

export default DetailTitle;
