import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getlocalStorage } from '../../services/localStorage';
import DetailsHeader from '../../components/DetailsHeader';
import InstructionsSection from '../../components/InstructionsSection';
import Loading from '../../components/Loading';
import RecipeButton from '../../components/RecipeButton';
import Recomendations from '../../components/Recomendations';
import { getDrinkDetails } from '../../services/theCockTailDB';
import { FetchFoodsOnMount } from '../../services/theMeadlDB';

// import { Container } from './styles';

function DrinksDetails() {
  const { id: idPage } = useParams();
  const [drinkData, setDrinkData] = useState([{}]);
  const [isFetching, setIsFetching] = useState(true);
  const [recomendations, setRecomendations] = useState([{}]);
  const [useShowRecipeButton, setUseShowRecipeButton] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const recipe = await getDrinkDetails(idPage);
        setDrinkData(recipe);
        const currentRecomendations = await FetchFoodsOnMount();
        setRecomendations(currentRecomendations);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [idPage]);

  useEffect(() => {
    const verifyDoneStorage = () => {
      const doneRecipes = getlocalStorage('doneRecipes');
      const isDone = doneRecipes && doneRecipes.some(
        ({ id: idDrink }) => idDrink === idPage,
      );
      setUseShowRecipeButton(isDone);
    };
    verifyDoneStorage();
  }, [idPage]);

  if (isFetching) return <Loading />;
  const { strDrink, strCategory, strDrinkThumb, strAlcoholic } = drinkData ? drinkData[0]
    : {
      strDrink: ' ',
      strCategory: ' ',
      strDrinkThumb: ' ',
      strAlcoholic: ' ',
    };
  return (
    <Container className="m-0 p-0 d-flex justify-content-center flex-column mb-5" fluid>
      <Container className="m-0 p-0">
        <DetailsHeader
          title={ strDrink }
          imgSrc={ strDrinkThumb }
          category={ strCategory }
          alcoholic={ strAlcoholic }
        />
      </Container>
      { drinkData && (
        <Container>
          <InstructionsSection fullRecipe={ drinkData } />
        </Container>)}
      <Recomendations recomendations={ recomendations } />
      { !useShowRecipeButton && (
        <RecipeButton />
      )}
    </Container>
  );
}

export default DrinksDetails;
