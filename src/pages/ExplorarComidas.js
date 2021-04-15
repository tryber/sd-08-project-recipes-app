import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import { getRandomFood } from '../helpers';

export default function ExploreFoods() {
  const [randomFood, setRandomFood] = useState();
  const handleGetFood = async () => {
    console.log('food');
    const result = await getRandomFood();
    if (result) {
      setRandomFood(result.meals[0].idMeal);
      console.log(randomFood);
    }
  };

  useEffect(() => {
    handleGetFood();
  }, []);

  return (
    <div>
      <Container fluid className="main-profile">
        <HeaderLocation />
        <div className="perfil-container">
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/comidas/ingredientes"
          >
            <Button
              className="default-button"
              block
              type="button"
            >
              Por Ingredientes
            </Button>
          </Link>
          <Link
            data-testid="explore-by-area"
            to="/explorar/comidas/area"
          >
            <Button
              className="default-button"
              block
              type="button"
            >
              Por Local de Origem
            </Button>
          </Link>
          <Link
            data-testid="explore-surprise"
            to={ `/comidas/${randomFood}` }
            onClick={ handleGetFood }
          >
            <Button
              className="default-button"
              block
              type="button"
            >
              Me Surpreenda!
            </Button>
          </Link>

        </div>
      </Container>
      <Footer className="footer white" />
    </div>
  );
}
