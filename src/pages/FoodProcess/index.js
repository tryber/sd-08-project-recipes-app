import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import DetailsHeader from '../../components/DetailsHeader';
import FinishButton from '../../components/FinishButton';
import InstructionsInProgress from '../../components/InstructionsInProgress';
import Loading from '../../components/Loading';
import { getlocalStorage, setLocalStorage } from '../../services/localStorage';
import { getMealDetails } from '../../services/theMeadlDB';

// import { Container } from './styles';

function FoodProcess() {
  const { id: idPage } = useParams();
  const [mealData, setMealData] = useState([{}]);
  const [isFetching, setIsFetching] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [checkedInstructions, setCheckedInstructions] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const recipe = await getMealDetails(idPage);
        setMealData(recipe);
        const allRecipe = recipe[0];
        const ingredientKeys = Object.keys(allRecipe).filter(
          (key) => key.includes('strIngredient') && allRecipe[key],
        );
        setInstructions(ingredientKeys);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [idPage]);

  useEffect(() => {
    const verifyCheckedInstructions = () => {
      const inProgressRecipe = getlocalStorage('inProgressRecipes');
      if (inProgressRecipe) {
        const { meals } = inProgressRecipe;
        const currentRecipe = meals[idPage] || [];
        setCheckedInstructions(currentRecipe);
      }
    };
    verifyCheckedInstructions();
  }, [idPage]);

  useEffect(() => {
    const changeLocalStorage = () => {
      const inProgressRecipe = getlocalStorage('inProgressRecipes');
      const { meals } = !inProgressRecipe ? [] : inProgressRecipe;
      const newCheckedsArray = {
        ...meals,
        [idPage]: checkedInstructions,
      };
      setLocalStorage('inProgressRecipes', {
        ...inProgressRecipe, meals: newCheckedsArray,
      });
    };
    changeLocalStorage();
  }, [checkedInstructions, idPage]);

  if (isFetching) return <Loading />;

  const { strMeal,
    strCategory, strMealThumb, strAlcoholic, strArea } = mealData && mealData[0];

  const allMealData = mealData && mealData[0];

  return (
    <Container className="m-0 p-0 d-flex justify-content-center flex-column mb-5" fluid>
      <Container className="m-0 p-0">
        <DetailsHeader
          title={ strMeal }
          imgSrc={ strMealThumb }
          category={ strCategory }
          alcoholic={ strAlcoholic }
          area={ strArea }
        />
      </Container>
      { mealData && (
        <InstructionsInProgress
          allData={ allMealData }
          setCheckedInstructions={ setCheckedInstructions }
          checkedInstructions={ checkedInstructions }
          ingredientKeys={ instructions }
        />
      )}
      <FinishButton
        checkedInstructions={ checkedInstructions }
        instructions={ instructions }
      />
    </Container>
  );
}

export default FoodProcess;
