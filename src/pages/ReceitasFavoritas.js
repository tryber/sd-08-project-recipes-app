import React, { useContext, useEffect, useRef, useState } from 'react';

import { Button, CardDeck, Card, Nav, Overlay, Popover } from 'react-bootstrap';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const ReceitasFavoritas = () => {
  const { setHeaderInfo,
    favoriteRecipes, setFavoriteRecipes,
  } = useContext(ContextRecipes);

  const [renderMSG, setRenderMSG] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesFromLocalStorage !== null) {
      setFavoriteRecipes(favoriteRecipesFromLocalStorage);
    }
    setHeaderInfo({
      pageTitle: 'Receitas Favoritas',
    });
  }, [setHeaderInfo, setFavoriteRecipes]);

  const filterFood = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((fav) => fav.type === 'comida'));
  };

  const filterDrink = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((fav) => fav.type === 'bebida'));
  };

  const filterAll = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const removerLocalStorage = (id) => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((fav) => fav.id !== id));
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify(
        JSON.parse(localStorage.getItem('favoriteRecipes'))
          .filter((fav) => fav.id !== id),
      ),
    );
  };

  const msgTime = 5000;
  const copiarURL = (tipo, id, e) => {
    setRenderMSG(true);
    setTarget(e.target);
    setTimeout(() => { setRenderMSG(false); }, msgTime);
    copy(`http://localhost:3000/${tipo}/${id}`);
  };
  const NUMERO_DE_CARDS_MAX = 4;
  const classCardHeigth = favoriteRecipes
    .length < NUMERO_DE_CARDS_MAX ? 'cardHeigth' : 'cardHeigth2';

  return (
    <section className={ `w-100 bg-dark ${classCardHeigth} receitasF` }>
      <Header />
      { favoriteRecipes.length === 0
        ? (
          <div className="cardBody">
            <h1 className="text-light">Nenhum Receita Favoritada...</h1>
            <h1>:-(</h1>
          </div>
        ) : (
          <div>
            <div className="buttonsList">
              <Button
                variant="success"
                className="categoryButton"
                type="button"
                name="options"
                id="option1"
                checked
                data-testid="filter-by-all-btn"
                onClick={ filterAll }
              >
                All
              </Button>
              <Button
                type="button"
                className="categoryButton"
                name="options"
                id="option2"
                variant="success"
                data-testid="filter-by-food-btn"
                onClick={ filterFood }
              >
                Food
              </Button>
              <Button
                type="button"
                className="categoryButton"
                name="options"
                id="option3"
                variant="success"
                data-testid="filter-by-drink-btn"
                onClick={ filterDrink }
              >
                Drinks
              </Button>
            </div>
            <CardDeck className="d-flex flex-row flex-wrap justify-content-center p-2">
              { favoriteRecipes.map((favoriteArray, index) => (
                <Card key={ index } className="m-1 p-0 border-dark d-flex flex-row">
                  <Card.Body className="p-0 w-50">
                    <Nav.Link href={ `http://localhost:3000/${favoriteArray.type}s/${favoriteArray.id}` } className="p-0">
                      <Card.Img
                        variant="top"
                        src={ favoriteArray.image }
                        alt="Foto do Cocktail"
                        data-testid={ `${index}-horizontal-image` }
                      />
                    </Nav.Link>
                  </Card.Body>
                  <Card.Body className="p-1 w-50">
                    <Card.Text
                      data-testid={ `${index}-horizontal-top-text` }
                      className="fs-6 p-0 mb-3 fst-italic fw-light"
                    >
                      {
                        favoriteArray.alcoholicOrNot === ''
                          ? `${favoriteArray.area} - ${favoriteArray.category}`
                          : (
                            `${favoriteArray.alcoholicOrNot}`
                          )
                      }
                    </Card.Text>
                    <Nav.Link
                      href={ `http://localhost:3000/${favoriteArray.type}s/${favoriteArray.id}` }
                      data-testid={ `${index}-horizontal-name` }
                      className="fs-5 p-0 mb-4 lh-1 fw-bold"
                    >
                      { favoriteArray.name }
                    </Nav.Link>
                    <div
                      className="d-flex flex-row justify-content-evenly mb-1"
                      ref={ ref }
                    >
                      <input
                        type="image"
                        src={ ShareIcon }
                        alt="Botão Compartilhar"
                        data-testid={ `${index}-horizontal-share-btn` }
                        className="share"
                        onClick={ (e) => copiarURL(
                          `${favoriteArray.type}s`, favoriteArray.id, e,
                        ) }
                      />
                      <Overlay
                        show={ renderMSG }
                        target={ target }
                        placement="bottom"
                        container={ ref.current }
                      >
                        <Popover id="popover-contained">
                          Link copiado!
                        </Popover>
                      </Overlay>
                      <input
                        type="image"
                        src={ BlackHeartIcon }
                        alt="Botão Favoritar"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        onClick={ () => removerLocalStorage(favoriteArray.id) }
                      />
                    </div>
                  </Card.Body>
                </Card>
              )) }
            </CardDeck>
          </div>) }
    </section>
  );
};

export default ReceitasFavoritas;
