import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem } from '../store/apiSlice';
import Header from './Header';
import Footer from './Footer';

function ExplorarComidas() {
  const [surprise, setSurprise] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingAPI = useSelector((state) => state.api.loading);
  const data = useSelector((state) => state.api.data.meals);

  const surpriseButton = () => {
    dispatch(fetchItem('https://www.themealdb.com/api/json/v1/1/random.php'));
    setSurprise(true);
  };

  if (loadingAPI === 'fulfilled' && surprise) {
    setSurprise(false);
    history.push(`/comidas/${data[0].idMeal}`);
  }

  return (
    <>
      <Header title="Explorar Comidas" searchType="none" />
      <Container>
        <Row>
          <Col xl="8">
            <Button
              variant="secondary"
              data-testid="explore-by-ingredient"
              onClick={ () => history.push('/explorar/comidas/ingredientes') }
            >
              Por Ingredientes
            </Button>
          </Col>
          <Col xl="8">
            <Button
              variant="secondary"
              data-testid="explore-by-area"
              onClick={ () => history.push('/explorar/comidas/area') }
            >
              Por Local de Origem
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

export default ExplorarComidas;
