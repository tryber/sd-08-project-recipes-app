import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, CardDeck, Nav, Overlay, Popover } from 'react-bootstrap';
import copy from 'clipboard-copy';

import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';
import ShareIcon from '../images/shareIcon.svg';

const ReceitasFeitas = () => {
  const { setHeaderInfo } = useContext(ContextRecipes);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderMSG, setRenderMSG] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const doneRecipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneRecipesFromLocalStorage !== null) {
      setDoneRecipes(doneRecipesFromLocalStorage);
    }
    setHeaderInfo({
      pageTitle: 'Receitas Feitas',
    });
  }, [setHeaderInfo, setDoneRecipes]);

  const filterFood = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((done) => done.type === 'comida'));
  };

  const filterDrink = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((done) => done.type === 'bebida'));
  };

  const filterAll = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  const msgTime = 5000;
  const copiarURL = (tipo, id, e) => {
    console.log(tipo);
    setRenderMSG(true);
    setTarget(e.target);
    setTimeout(() => { setRenderMSG(false); }, msgTime);
    copy(`http://localhost:3000/${tipo}/${id}`);
  };
  const NUMERO_DE_CARDS_MAX = 4;
  const classCardHeigth = doneRecipes.length < NUMERO_DE_CARDS_MAX
    ? 'cardHeigth' : 'cardHeigth2';

  return (
    <section className={ `w-100 bg-dark ${classCardHeigth} receitasF` }>
      <Header />
      { doneRecipes.length === 0
        ? (
          <div className="cardBody">
            <h1 className="text-light">Nenhum Receita Feita...</h1>
            <h1>:-(</h1>
          </div>
        ) : (
          <div>
            <div className="buttonsList">
              <Button
                variant="success"
                className="categoryButton"
                type="button"
                checked
                data-testid="filter-by-all-btn"
                onClick={ filterAll }
              >
                All
              </Button>
              <Button
                variant="success"
                className="categoryButton"
                type="button"
                data-testid="filter-by-food-btn"
                onClick={ filterFood }
              >
                Food
              </Button>
              <Button
                variant="success"
                className="categoryButton"
                type="button"
                data-testid="filter-by-drink-btn"
                onClick={ filterDrink }
              >
                Drinks
              </Button>
            </div>
            <CardDeck className="d-flex flex-row flex-wrap justify-content-center p-2">
              { doneRecipes.map((doneRecipe, index) => (
                <Card key={ index } className="m-1 p-0 border-dark d-flex flex-row">
                  <Card.Body className="p-0 w-50">
                    <Nav.Link href={ `http://localhost:3000/${doneRecipe.type}s/${doneRecipe.id}` } className="p-0">
                      <Card.Img
                        variant="top"
                        src={ doneRecipe.image }
                        alt="Foto da receita"
                        data-testid={ `${index}-horizontal-image` }
                      />
                    </Nav.Link>
                  </Card.Body>
                  <Card.Body className="p-1 w-50">
                    <div
                      className="d-flex flex-row justify-content-between mb-3"
                      ref={ ref }
                    >
                      <Card.Text
                        data-testid={ `${index}-horizontal-top-text` }
                        className="m-0"
                      >
                        <small>
                          {
                            doneRecipe.alcoholicOrNot === ''
                              ? `${doneRecipe.area} - ${doneRecipe.category}`
                              : (
                                `${doneRecipe.alcoholicOrNot}`
                              )
                          }
                        </small>
                      </Card.Text>
                      <input
                        type="button"
                        src={ ShareIcon }
                        alt="Botão Compartilhar"
                        data-testid={ `${index}-horizontal-share-btn` }
                        className="share"
                        onClick={ (e) => copiarURL(
                          `${doneRecipe.type}s`, doneRecipe.id, e,
                        ) }
                      />
                      <Overlay
                        show={ renderMSG }
                        target={ target }
                        placement="bottom"
                        container={ ref.current }
                        data-testid="mensagem"
                      >
                        <Popover id="popover-contained">
                          Link copiado!
                        </Popover>
                      </Overlay>
                    </div>
                    <Nav.Link href={ `http://localhost:3000/${doneRecipe.type}s/${doneRecipe.id}` } className="m-0 p-0 mb-3">
                      <Card.Text
                        data-testid={ `${index}-horizontal-name` }
                        className="fs-5 fw-bold lh-1"
                      >
                        { doneRecipe.name }
                      </Card.Text>
                    </Nav.Link>
                    <Card.Text className="m-0 mb-2">
                      <small
                        className="text-muted fst-italic"
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        { `Feito em: ${doneRecipe.doneDate}` }
                      </small>
                    </Card.Text>
                    { doneRecipe.tags.map((tag) => (
                      <span
                        key={ tag }
                        className="badge bg-primary m-1"
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </span>
                    )) }
                  </Card.Body>
                </Card>
              )) }
            </CardDeck>
          </div>) }
    </section>
  );
};

export default ReceitasFeitas;
