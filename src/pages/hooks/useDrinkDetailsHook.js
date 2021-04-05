import { useEffect, useState } from 'react';
import { getDrinkFiltredById } from '../../services/api';

function useDrinkDetailsHook() {
  const [id, setId] = useState();
  const [recipe, setRecipe] = useState({});
  const [ingredientsAndMeasuresList, setIngredientsAndMeasuresList] = useState([]);
  const [isDone, setISDone] = useState(false);

  function createIngredientList(receita) {
    const ING_INDEX = 15;
    let ingredientList = [];
    let quantitiesList = [];
    for (let i = 1; i <= ING_INDEX; i += 1) {
      ingredientList = [...ingredientList, receita[`strIngredient${i}`]];
      quantitiesList = [...quantitiesList, receita[`strMeasure${i}`]];
    }
    const ingredientAndMeasure = quantitiesList
      .filter((qua) => qua !== null && qua !== '')
      .map((mes, index) => `${mes} ${ingredientList[index]}`);
    return setIngredientsAndMeasuresList(ingredientAndMeasure);
  }

  useEffect(() => {
    async function fetchRecipe(idNum) {
      const currRecipe = await getDrinkFiltredById(idNum);
      console.log('receita atual', currRecipe);
      setRecipe(currRecipe);
      createIngredientList(currRecipe);
    }
    fetchRecipe(id);
  }, [id]);

  useEffect(() => {
    function checkDoneRecipes() {
      const localData = localStorage.getItem('doneRecipes');
      const doneRecipesList = localData ? JSON.parse(localData) : [];
      console.log('doneRecipes localStorage: ', localData);
      if (doneRecipesList.length > 0) {
        return doneRecipesList.find((each) => each.id === id);
      }
      return false;
    }
    const isItDone = checkDoneRecipes();
    if (isItDone) {
      setISDone(true);
    } else {
      setISDone(false);
    }
  }, [id]);

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic } = recipe;

  return [
    setId,
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
    isDone,
    ingredientsAndMeasuresList,
  ];
}

export default useDrinkDetailsHook;
