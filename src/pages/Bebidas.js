import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardDeck, Card, Button } from 'react-bootstrap';
import ContextRecipes from '../context/ContextRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  getAllBebida,
  getBebidaCategory,
  getBebidaByCategory } from '../services/BuscaNasAPIs';

const MAX_CARDS = 12;
const MAX_CATEGORIES = 6;

const Bebidas = () => {
  const { dataByBusca, setHeaderInfo, barraBuscar } = useContext(ContextRecipes);
  const history = useHistory();
  const [dataBebidas, setDataBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [actualCategory, setActualCategory] = useState('');

  useEffect(() => {
    async function getCategorias() {
      const categoriasResult = await getBebidaCategory();
      setCategorias([{ strCategory: 'All' }, ...categoriasResult.drinks]);
    }
    async function getAll() {
      const allDrink = await getAllBebida();
      setDataBebidas(allDrink.drinks);
    }
    if (barraBuscar.input === '') {
      getAll();
    }
    getCategorias();
  }, [barraBuscar.input]);

  useEffect(() => {
    setHeaderInfo({ pageTitle: 'Bebidas', showSearchIcon: true });
  }, [setHeaderInfo]);

  useEffect(() => {
    if (dataByBusca.drinks === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (dataByBusca.drinks !== undefined) {
      if (dataByBusca.drinks.length > 1) {
        setDataBebidas([...dataByBusca.drinks]);
      } else if (dataByBusca.drinks.length === 1) {
        history.push(`/bebidas/${dataByBusca.drinks[0].idDrink}`);
      }
    }
  }, [dataByBusca, history]);

  async function filterCategory(category) {
    const eatable = actualCategory === category ? 'All' : category;
    const allFood = eatable === 'All'
      ? await getAllBebida()
      : await getBebidaByCategory(category);
    setDataBebidas(allFood.drinks);
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
          dataBebidas && dataBebidas.map((bebida, index) => {
            if (index < MAX_CARDS) {
              return (
                <Card
                  key={ bebida.idDrink }
                  data-testid={ `${index}-recipe-card` }
                  className="col-5 m-2 border-dark"
                  onClick={ () => history.push(`/bebidas/${bebida.idDrink}`) }
                >
                  <Card.Img
                    variant="top"
                    data-testid={ `${index}-card-img` }
                    src={ bebida.strDrinkThumb }
                  />
                  <Card.Body>
                    <Card.Title data-testid={ `${index}-card-name` }>
                      { bebida.strDrink }
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

export default Bebidas;
