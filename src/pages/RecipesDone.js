import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HeaderSimple from '../components/HeaderSimple';
import NavBarDoneRecipe from '../components/NavBarDoneRecipe';
import CardDoneRecipe from '../components/CardDoneRecipe';

function RecipesDone() {
  const [filter, setFilter] = useState('all');

  const onClickTypeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col xs={ 12 }>
          <HeaderSimple />
        </Col>
      </Row>
      <NavBarDoneRecipe onClickTypeFilter={ onClickTypeFilter } />
      <CardDoneRecipe typeFilter={ filter } />
    </Container>
  );
}

export default RecipesDone;
