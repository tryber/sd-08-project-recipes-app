import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ExploreByWhat } from '../../components/Buttons';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getRandomRecipe } from '../../services/api';

function ExplorerDrink() {
  const [randomRecipeNumber, setRandomRecipeNumber] = useState('');
  const history = useHistory();
  const onClickSurprise = () => history.push(`/bebidas/${randomRecipeNumber}`);

  useEffect(() => {
    async function setTheRandom() {
      const setting = await getRandomRecipe('random', 'Drinks');
      setRandomRecipeNumber(setting.drinks[0].idDrink);
    } setTheRandom();
  }, []);

  return (
    <div>
      <Header name="Explorar Bebidas" currentPage="Drinks" icon="false" />
      <ExploreByWhat
        dataTestId="ingredient"
        ptBr="Ingredientes"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
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

export default ExplorerDrink;
