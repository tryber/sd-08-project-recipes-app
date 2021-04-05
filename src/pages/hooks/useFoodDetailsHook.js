import { useEffect, useState } from 'react';

function useFoodDetailsHook() {
  const [id, setId] = useState();
  const [recipe, setRecipe] = useState({});
  const [ingredientsAndMeasuresList, setIngredientsAndMeasuresList] = useState([]);
  const [isDone, setISDone] = useState(false);

  function createIngredientList(receita) {
    const ING_INDEX = 20;
    let ingredientList = [];
    let quantitiesList = [];
    for (let i = 1; i <= ING_INDEX; i += 1) {
      ingredientList = [...ingredientList, receita[`strIngredient${i}`]];
      quantitiesList = [...quantitiesList, receita[`strMeasure${i}`]];
    }
    const ingredientAndMeasure = quantitiesList
      .filter((qua) => qua && qua !== ' ' && qua !== null)
      .map((mes, index) => `${mes} ${ingredientList[index]}`);
    console.log('lista de ing: ', ingredientAndMeasure);
    return setIngredientsAndMeasuresList(ingredientAndMeasure);
  }

  useEffect(() => {
    async function fetchRecipe(idNum) {
      const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNum}`)
        .then((res) => res.json())
        .then((data) => data);
      const { meals } = result;
      const currRecipe = meals[0];
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
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = recipe;

  return [
    setId,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
    isDone,
    ingredientsAndMeasuresList,
  ];
}

export default useFoodDetailsHook;
