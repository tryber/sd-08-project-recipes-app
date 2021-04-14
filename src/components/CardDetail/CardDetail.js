import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { recomendedRecipes } from '../../services/FoodsDrinksRequests';
import SlideCards from '../SlideCards/SlideCards';
import './cardDetail.css';

const CardDetails = ({ title, object, isLoading, children }) => {
  const [recomended, setRecomended] = useState([]);
  const [saveClipBoard, setSaveClipBoard] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const savetoClipboard = () => {
    const { idDrink, idMeal } = object;
    if (pathname.includes('/in-progress') && title === 'Bebidas') {
      window.navigator.clipboard.writeText(
        `http://localhost:3000/${title.toLowerCase()}/${idDrink}`,
      );
    } else if (pathname.includes('/in-progress') && title === 'Comidas') {
      window.navigator.clipboard.writeText(
        `http://localhost:3000/${title.toLowerCase()}/${idMeal}`,
      );
    } else {
      window.navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    }
    setSaveClipBoard(true);
  };
  useEffect(() => {
    recomendedRecipes(title).then((response) => setRecomended(response));
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (local.length > 0 && local[0].id === id) {
      setFavorite(true);
    }
  }, []);
  const savetoFavorites = () => {
    favorite === false ? setFavorite(true) : setFavorite(false);
    const {
      idMeal,
      strCategory,
      strArea,
      strMeal,
      strAlcoholic,
      strDrinkThumb,
      strDrink,
      idDrink,
      strMealThumb,
    } = object;

    if (title === 'Comidas' && favorite === false) {
      const Objectid = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([Objectid]));
    }
    if (title === 'Bebidas' && favorite === false) {
      const Objectid = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([Objectid]));
    }
    const objetoAtual = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filter = objetoAtual.filter(
      (elemento) => elemento.id !== objetoAtual[0].id,
    );
    favorite === true &&
      localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
  };

  const renderVideo = () => {
    if (title === 'Comidas' && object.strYoutube !== undefined) {
      const urlVideo = object.strYoutube.replace('watch', 'embed');
      return (
        <iframe
          data-testid="video"
          width="300"
          height="200"
          src={urlVideo}
          frameBorder="0"
          allowFullScreen
          title="vídeo"
        />
      );
    }
  };

  if (isLoading === true) {
    return <div>Loading</div>;
  }
  if (isLoading === false && object !== {}) {
    return (
      <Card className="card-detail">
        <Card.Img
          data-testid="recipe-photo"
          variant="top"
          src={title === 'Comidas' ? object.strMealThumb : object.strDrinkThumb}
        />
        <Card.Body>
          <Card.Title data-testid="recipe-title">
            {title === 'Comidas' ? object.strMeal : object.strDrink}
          </Card.Title>
          <Button
            variant="outline-secondary"
            data-testid="share-btn"
            onClick={() => savetoClipboard()}
          >
            {saveClipBoard === true ? (
              'Link copiado!'
            ) : (
              <img
                src={shareIcon}
                alt="Profile icon"
                data-testid="explore-bottom-btn"
              />
            )}
          </Button>
          <Button
            variant="outline-secondary"
            data-testid="favorite-btn"
            src={favorite ? blackHeartIcon : whiteHeartIcon}
            onClick={() => savetoFavorites()}
          >
            {favorite === true ? (
              <img
                src={blackHeartIcon}
                alt="Profile icon"
                data-testid="explore-bottom-btn"
              />
            ) : (
              <img
                src={whiteHeartIcon}
                alt="Profile icon"
                data-testid="explore-bottom-btn"
              />
            )}
          </Button>
          <Card.Text data-testid="recipe-category">
            {title === 'Comidas' ? object.strCategory : object.strAlcoholic}
          </Card.Text>
          {children}
          <Card.Text data-testid="instructions" className="instructions">
            <h4>Modo de Preparo</h4>
            {object.strInstructions &&
              object.strInstructions
                .split('.')
                .map(
                  (item, index) =>
                    item.trim('') && <li key={index}>{item + '.'}</li>,
                )}
          </Card.Text>
          {renderVideo()}
          <h4>Recomendações</h4>
          <SlideCards
            title={title === 'Comidas' ? 'Bebidas' : 'Comidas'}
            results={recomended}
            numberOfCards={6}
          />
        </Card.Body>
      </Card>
    );
  }
};

CardDetails.propTypes = {
  title: PropTypes.string.isRequired,
  object: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.string.isRequired,
};

export default CardDetails;
