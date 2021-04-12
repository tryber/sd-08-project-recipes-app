import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import DetailsHeader from '../../components/DetailsHeader';
import FinishButton from '../../components/FinishButton';
import InstructionsInProgress from '../../components/InstructionsInProgress';
import Loading from '../../components/Loading';
import { getlocalStorage, setLocalStorage } from '../../services/localStorage';
import { getDrinkDetails } from '../../services/theCockTailDB';

function DrinksProcess() {
  const { id: idPage } = useParams();
  const [drinkData, setDrinkData] = useState([{}]);
  const [isFetching, setIsFetching] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [checkedInstructions, setCheckedInstructions] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const recipe = await getDrinkDetails(idPage);
        setDrinkData(recipe);
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
        const { cocktails } = inProgressRecipe;
        const currentRecipe = cocktails[idPage] || [];
        setCheckedInstructions(currentRecipe);
      }
    };
    verifyCheckedInstructions();
  }, [idPage]);

  useEffect(() => {
    const changeLocalStorage = () => {
      const inProgressRecipe = getlocalStorage('inProgressRecipes');
      const { cocktails } = !inProgressRecipe ? [] : inProgressRecipe;
      const newCheckedsArray = {
        ...cocktails,
        [idPage]: checkedInstructions,
      };
      setLocalStorage('inProgressRecipes', {
        ...inProgressRecipe, cocktails: newCheckedsArray,
      });
    };
    changeLocalStorage();
  }, [checkedInstructions, idPage]);

  if (isFetching) return <Loading />;

  const { idDrink, strDrink, strCategory,
    strDrinkThumb, strAlcoholic, strTags } = drinkData && drinkData[0];

  const allDrinkData = drinkData && drinkData[0];

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
      { allDrinkData && !isFetching && (
        <>
          <InstructionsInProgress
            allData={ allDrinkData }
            setCheckedInstructions={ setCheckedInstructions }
            checkedInstructions={ checkedInstructions }
            ingredientKeys={ instructions }
          />
          <FinishButton
            checkedInstructions={ checkedInstructions }
            instructions={ instructions }
            id={ idDrink }
            type="bebida"
            area=""
            category={ strCategory }
            alcoholicOrNot={ strAlcoholic }
            name={ strDrink }
            image={ strDrinkThumb }
            tags={ strTags }
          />
        </>
      )}
    </Container>
  );
}

export default DrinksProcess;
