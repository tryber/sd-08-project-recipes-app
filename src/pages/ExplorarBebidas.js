import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import { getRandomDrink } from '../helpers';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const handleGetDrink = async () => {
    console.log('drink');
    const result = await getRandomDrink();
    if (result) {
      setRandomDrink(result.drinks[0].idDrink);
      console.log(randomDrink);
    }
  };

  useEffect(() => {
    handleGetDrink();
  }, []);

  return (
    <div>
      <Container fluid className="main-profile">
        <HeaderLocation title="Explorar Bebidas" />
        <div className="perfil-container">
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/bebidas/ingredientes"
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
            data-testid="explore-surprise"
            to={ `/bebidas/${randomDrink}` }
            onClick={ handleGetDrink }
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
