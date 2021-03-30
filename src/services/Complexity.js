export default function buttonTextChanges(currentFood) {
  const ingredientList = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
  const Meal = Object.keys(ingredientList.meals || []).includes(currentFood.idMeal);
  const Drink = Object.keys(ingredientList.cocktails || [])
    .includes(currentFood.idDrink);
  if (Meal === true || Drink === true) {
    return true;
  }
}
