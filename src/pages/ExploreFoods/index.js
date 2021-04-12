import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';
import { getRandomMeal } from '../../services/theMeadlDB';

// import { Container } from './styles';

function ExploreFoods() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const randomDetailMeal = async () => {
    setIsLoading(true);
    const { idMeal } = await getRandomMeal();
    setIsLoading(false);
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <ContainerDefault title="Explorar Comidas">
      <Button
        type="button"
        className="mb-3"
        data-testid="explore-by-ingredient"
        size="block"
        disabled={ isLoading }
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        type="button"
        className="mb-3"
        data-testid="explore-by-area"
        size="block"
        disabled={ isLoading }
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </Button>
      <Button
        type="button"
        className="mb-3 mx-0"
        data-testid="explore-surprise"
        size="block"
        onClick={ randomDetailMeal }
        disabled={ isLoading }
      >
        { !isLoading ? 'Me Surpreenda!' : 'Você que manda!'}
      </Button>

    </ContainerDefault>
  );
}

export default ExploreFoods;
