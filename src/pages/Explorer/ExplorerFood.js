import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ExploreByWhat } from '../../components/Buttons';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getRandomRecipe } from '../../services/api';

function ExplorerFood() {
  const [randomRecipeNumber, setRandomRecipeNumber] = useState('');
  const history = useHistory();
  const onClickSurprise = () => history.push(`/comidas/${randomRecipeNumber}`);

  useEffect(() => {
    async function setTheRandom() {
      const setting = await getRandomRecipe('random', 'Foods');
      setRandomRecipeNumber(setting.meals[0].idMeal);
    } setTheRandom();
  }, []);

  return (
    <div>
      <Header name="Explorar Comidas" currentPage="Foods" icon="false" />
      <ExploreByWhat
        dataTestId="area"
        ptBr="Local de Origem"
        onClick={ () => history.push('/explorar/comidas/area') }
      />
      <ExploreByWhat
        dataTestId="ingredient"
        ptBr="Ingredientes"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      />
      <ExploreByWhat
        dataTestId="surprise"
        ptBr="Me Surpreenda!"
        onClick={ onClickSurprise }
      />
      <Footer />
    </div>
  );
}

export default ExplorerFood;
