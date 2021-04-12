export default (response, key) => Object.entries(response[key][0])
  .filter((mealItem) => mealItem[1] !== '' && mealItem[1])
  .reduce(
    (acc, crr) => {
      const isStrIngredient = crr[0].includes('strIngredient');
      const isStrMeasure = crr[0].includes('strMeasure');
      if (isStrIngredient) {
        return Object.assign(acc, {
          ingredients: [...acc.ingredients, crr[1]],
        });
      }
      if (isStrMeasure) {
        return Object.assign(acc, {
          measures: [...acc.measures, crr[1]],
        });
      }
      return Object.assign(acc, { [crr[0]]: crr[1],
      });
    },
    { ingredients: [], measures: [] },
  );
