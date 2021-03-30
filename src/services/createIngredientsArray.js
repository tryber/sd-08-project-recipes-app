function createIngredientsArray(obj) {
  const IngredientsArray = [];
  const TOTAL_NUMBER_OF_INGREDIENTS = 20;
  for (let i = 1; i <= TOTAL_NUMBER_OF_INGREDIENTS; i += 1) {
    const ingr = `strIngredient${i}`;
    const meas = `strMeasure${i}`;
    if (obj[ingr]) {
      if (obj[meas]) {
        IngredientsArray.push(`${obj[ingr]} - ${obj[meas]}`);
      } else {
        IngredientsArray.push(`${obj[ingr]}`);
      }
    }
  }
  return IngredientsArray;
}

export default createIngredientsArray;
