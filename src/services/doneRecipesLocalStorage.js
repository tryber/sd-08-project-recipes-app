export async function addDoneLocal(obj) {
  const done = await JSON.parse(localStorage.getItem('doneRecipes')) || [];
  done.push(obj);
  localStorage.setItem('doneRecipes', JSON.stringify(done));
}

export function createObject(currentFood, pathAndId) {
  const typeRecipe = {
    '/comidas': 'comida',
    '/bebidas': 'bebida',
  };

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${dd}/${mm}/${yyyy}`;

  return {
    id: pathAndId[2],
    type: typeRecipe[pathAndId[1]],
    area: currentFood.strArea || '',
    category: currentFood.strCategory,
    alcoholicOrNot: currentFood.strAlcoholic || '',
    name: currentFood.strMeal || currentFood.strDrink,
    image: currentFood.strMealThumb || currentFood.strDrinkThumb,
    doneDate: today,
    tags: [],
  };
}
