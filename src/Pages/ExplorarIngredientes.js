import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { fetchItem } from '../store/apiSlice';
import Header from './Header';
import Footer from './Footer';
import CardItens from './Card';

function ExplorarIngredientes() {
  const dispatch = useDispatch();
  const local = useHistory().location.pathname;

  let site = '';
  let ingredient = '';
  let tipo = '';
  if (local.includes('comida')) {
    site = 'themealdb';
    ingredient = 'strIngredient';
    tipo = 'meals';
  } else if (local.includes('bebidas')) {
    site = 'thecocktaildb';
    ingredient = 'strIngredient1';
    tipo = 'drinks';
  }

  useEffect(() => {
    dispatch(fetchItem(`https://www.${site}.com/api/json/v1/1/list.php?i=list`));
  }, [dispatch, site]);

  const loadingAPI = useSelector((state) => state.api.loading);
  const listIngredient = useSelector((state) => state.api.data[tipo]);

  if (loadingAPI === 'fulfilled' && listIngredient) {
    const listNew = [...listIngredient];
    listNew.length = 12;
    return (
      <>
        <Header title="Explorar Ingredientes" />
        <Container fluid style={ { marginBottom: '80px' } }>
          <Row style={ { justifyContent: 'space-around' } }>
            { listNew
              .map((food, index) => (
                <CardItens
                  key={ index }
                  index={ index }
                  name={ food[ingredient] }
                  image={ `https://www.${site}.com/images/ingredients/${food[ingredient]}-Small.png` }
                  id={ food.idIngredient }
                  food="true"
                />
              ))}
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header title="Explorar Ingredientes" searchType="none" />
      <h2>Carregando...</h2>
      <Footer />
    </>
  );
}

export default ExplorarIngredientes;
