import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Header from './Header';
import Detail from './Details/DetailHorizontal';

function ReceitasFeitas() {
  const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [feitas, setFeitas] = useState(storedDoneRecipes);

  const handleClick = (e) => {
    if (e === 'volta') {
      setFeitas(storedDoneRecipes);
    } else {
      setFeitas(storedDoneRecipes.filter((food) => food.type.includes(e)));
    }
  };

  return (
    <>
      <Header title="Receitas Feitas" searchType="none" />
      <Container>
        <Row style={ { justifyContent: 'space-around' } }>
          <Button
            variant="secondary"
            style={ { margin: '10px 0px', borderRadius: '5px' } }
            onClick={ () => handleClick('volta') }
            data-testid="filter-by-all-btn"
          >
            All
          </Button>
          <Button
            variant="secondary"
            style={ { margin: '10px 0px', borderRadius: '5px' } }
            onClick={ () => handleClick('comida') }
            data-testid="filter-by-food-btn"
          >
            Food
          </Button>
          <Button
            variant="secondary"
            style={ { margin: '10px 0px', borderRadius: '5px' } }
            onClick={ () => handleClick('bebida') }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
        </Row>
      </Container>
      <Container fluid style={ { marginBottom: '80px' } }>
        <Row style={ { justifyContent: 'space-around' } }>
          <Detail feitas={ feitas } />
        </Row>
      </Container>
    </>
  );
}

export default ReceitasFeitas;
