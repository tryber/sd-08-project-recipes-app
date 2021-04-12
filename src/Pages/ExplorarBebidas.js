import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem } from '../store/apiSlice';
import Header from './Header';
import Footer from './Footer';

function ExplorarBebidas() {
  const [surprise, setSurprise] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingAPI = useSelector((state) => state.api.loading);
  const data = useSelector((state) => state.api.data.drinks);

  const surpriseButton = () => {
    dispatch(fetchItem('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
    setSurprise(true);
  };

  if (loadingAPI === 'fulfilled' && surprise === true) {
    setSurprise(false);
    history.push(`/bebidas/${data[0].idDrink}`);
  }
  return (
    <>
      <Header title="Explorar Bebidas" searchType="none" />
      <Container>
        <Row>
          <Col xl="8">
            <Button
              variant="secondary"
              data-testid="explore-by-ingredient"
              onClick={ () => history.push('/explorar/bebidas/ingredientes') }
            >
              Por Ingredientes
            </Button>
          </Col>
          <Col xl="8">
            <Button
              variant="secondary"
              data-testid="explore-surprise"
              onClick={ () => surpriseButton() }
            >
              Me Surpreenda!
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
