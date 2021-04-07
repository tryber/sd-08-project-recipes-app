import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardDeck, Card, Button } from 'react-bootstrap';
import ContextRecipes from '../context/ContextRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  getAllComida,
  getComidaCategory,
  getComidaByCategory } from '../services/BuscaNasAPIs';

const MAX_CARDS = 12;
const MAX_CATEGORIES = 6;

const Comidas = () => {
  const { dataByBusca, barraBuscar, setHeaderInfo } = useContext(ContextRecipes);
  const history = useHistory();
  const [dataComidas, setDataComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [actualCategory, setActualCategory] = useState('');

  useEffect(() => {
    setHeaderInfo({ pageTitle: 'Comidas', showSearchIcon: true });
  }, [setHeaderInfo]);

  useEffect(() => {
    async function getCategorias() {
      const categoriasResult = await getComidaCategory();
      setCategorias([{ strCategory: 'All' }, ...categoriasResult.meals]);
    }
    async function getAll() {
      const allFood = await getAllComida();
      setDataComidas(allFood.meals);
    }
    if (barraBuscar.input === '') {
      getAll();
    }
    getCategorias();
  }, [barraBuscar.input]);

  useEffect(() => {
    setHeaderInfo({ pageTitle: 'Comidas', showSearchIcon: true });
  }, [setHeaderInfo]);

  useEffect(() => {
    if (dataByBusca.meals === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (dataByBusca.meals !== undefined) {
      if (dataByBusca.meals.length > 1) {
        setDataComidas([...dataByBusca.meals]);
      } else if (dataByBusca.meals.length === 1) {
        history.push(`/comidas/${dataByBusca.meals[0].idMeal}`);
      }
    }
  }, [dataByBusca, history]);

  async function filterCategory(category) {
    const eatable = actualCategory === category ? 'All' : category;
    const allFood = eatable === 'All'
      ? await getAllComida()
      : await getComidaByCategory(category);
    setDataComidas(allFood.meals);
    setActualCategory(category);
  }

  return (
    <section className="w-100 bg-dark cardHeigth2">
      <Header />
      <div className="buttonsList">
        {categorias.map((categoria, index) => {
          if (index < MAX_CATEGORIES) {
            return (
              <Button
                data-testid={ `${categoria.strCategory}-category-filter` }
                variant="success"
                className="categoryButton"
                type="button"
                key={ index }
                onClick={ () => filterCategory(categoria.strCategory) }
              >
                {categoria.strCategory}
              </Button>
            );
          }
          return false;
        })}
      </div>

      <CardDeck className="m-2 d-flex flex-row flex-wrap justify-content-center">
        {
          dataComidas && dataComidas.map((comida, index) => {
            if (index < MAX_CARDS) {
              return (
                <Card
                  key={ comida.idMeal }
                  data-testid={ `${index}-recipe-card` }
                  className="col-5 m-2 border-dark"
                  onClick={ () => history.push(`/comidas/${comida.idMeal}`) }
                >
                  <Card.Img
                    variant="top"
                    data-testid={ `${index}-card-img` }
                    src={ comida.strMealThumb }
                  />
                  <Card.Body>
                    <Card.Title data-testid={ `${index}-card-name` }>
                      { comida.strMeal }
                    </Card.Title>
                  </Card.Body>
                </Card>
              );
            }
            return false;
          })
        }
      </CardDeck>
      <Footer />
    </section>
  );
};

export default Comidas;
