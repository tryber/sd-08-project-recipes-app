import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';
import { getRandomDrink } from '../../services/theCockTailDB';

// import { Container } from './styles';

function ExploreDrinks() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const randomDetailsDrink = async () => {
    setIsLoading(true);
    const { idDrink } = await getRandomDrink();
    setIsLoading(false);
    history.push(`/bebidas/${idDrink}`);
  };
  return (
    <ContainerDefault title="Explorar Bebidas">
      <Button
        type="button"
        className="mb-3"
        data-testid="explore-by-ingredient"
        size="block"
        disabled={ isLoading }
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        type="button"
        className="mb-3 mx-0"
        data-testid="explore-surprise"
        size="block"
        onClick={ randomDetailsDrink }
        disabled={ isLoading }
      >
        { !isLoading ? 'Me Surpreenda!' : 'Você que manda!'}
      </Button>
    </ContainerDefault>
  );
}

export default ExploreDrinks;
