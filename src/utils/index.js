export const getDoneRecipes = () => {
  const RecipesArray = localStorage.getItem('doneRecipes');

  return JSON.parse(RecipesArray) || [];
};

export const inProgressRecipes = (isMeal) => {
  const RecipesArray = localStorage.getItem('inProgressRecipes') || '{}';

  return JSON.parse(RecipesArray)[isMeal ? 'meals' : 'cocktails'];
};
