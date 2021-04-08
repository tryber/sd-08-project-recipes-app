import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { useParams, useRouteMatch } from 'react-router';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { getlocalStorage, setLocalStorage } from '../../services/localStorage';
// import { Container } from './styles';

function DetailsHeader(props) {
  const { title, imgSrc, category, alcoholic, area } = props;
  const [useRecipeIsFavorite, setUseRecipeIsFavorite] = useState(false);
  const [useShow, setUseShow] = useState(false);
  const { id: idPage } = useParams();
  const { path } = useRouteMatch();
  useEffect(() => {
    const verifyDoneStorage = () => {
      const favoriteRecipes = getlocalStorage('favoriteRecipes');
      const isFavorite = favoriteRecipes && favoriteRecipes.some(
        ({ id }) => id === idPage,
      );
      setUseRecipeIsFavorite(isFavorite);
    };
    verifyDoneStorage();
  }, [idPage, path]);

  function copyUrl() {
    const url = path.includes('/comidas') ? `http://localhost:3000/comidas/${idPage}` : `http://localhost:3000/bebidas/${idPage}`;
    copy(url);
    setUseShow(true);
  }

  const handleLocalStorageFavorites = (e) => {
    const currentSrc = e.target.getAttribute('src');
    const type = path.includes('/comidas') ? 'comida' : 'bebida';
    if (currentSrc === whiteHeartIcon) {
      const addItem = {
        id: idPage,
        type,
        area,
        category,
        alcoholicOrNot: alcoholic,
        name: title,
        image: imgSrc,
      };
      const currentFavorites = getlocalStorage('favoriteRecipes');
      if (currentFavorites) {
        currentFavorites.push(addItem);
        setLocalStorage('favoriteRecipes', currentFavorites);
      } else {
        setLocalStorage('favoriteRecipes', [addItem]);
      }
      setUseRecipeIsFavorite(true);
    } else {
      const currentFavorites = getlocalStorage('favoriteRecipes');
      const removeFavorite = currentFavorites.filter(({ id }) => id !== idPage);
      setLocalStorage('favoriteRecipes', removeFavorite);
      setUseRecipeIsFavorite(false);
    }
  };

  return (
    <>
      <Container className="fluid p-0">
        <img
          src={ imgSrc }
          alt={ title }
          className="img-fluid"
          data-testid="recipe-photo"
        />
      </Container>
      <Container className="mt-3">
        <Row>
          <Col xs="8">
            <h2 data-testid="recipe-title" className="mb-0">{title}</h2>
          </Col>
          <Col xs="4">
            <input
              type="image"
              src={ shareIcon }
              alt="Share Button"
              className="mr-2"
              data-testid="share-btn"
              width="30px"
              onClick={ copyUrl }
            />
            <input
              type="image"
              src={ useRecipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Button"
              data-testid="favorite-btn"
              width="30px"
              onClick={ (e) => handleLocalStorageFavorites(e) }
            />
          </Col>
        </Row>
        <h5 className="text-muted" data-testid="recipe-category">
          {alcoholic || category}
        </h5>
      </Container>
      { useShow && (
        <Alert onClick={ () => setUseShow(false) } variant="success">
          Link copiado!
        </Alert>
      )}
    </>
  );
}

DetailsHeader.defaultProps = {
  alcoholic: '',
  area: '',
};

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholic: PropTypes.string,
  area: PropTypes.string,
};
export default DetailsHeader;
