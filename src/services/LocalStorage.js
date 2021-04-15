export function setLocalStorageDoneRecipesDrinks(detailDrinks, date) {
  const previousDoceRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (previousDoceRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...previousDoceRecipes,
        {
          id: detailDrinks[0].idDrink,
          type: 'bebida',
          area: '',
          category: detailDrinks[0].strCategory,
          alcoholicOrNot: detailDrinks[0].strAlcoholic,
          name: detailDrinks[0].strDrink,
          image: detailDrinks[0].strDrinkThumb,
          doneDate: date,
          tags: [detailDrinks[0].strTags],
        },
      ],
    ));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [
        {
          id: detailDrinks[0].idDrink,
          type: 'bebida',
          area: '',
          category: detailDrinks[0].strCategory,
          alcoholicOrNot: detailDrinks[0].strAlcoholic,
          name: detailDrinks[0].strDrink,
          image: detailDrinks[0].strDrinkThumb,
          doneDate: date,
          tags: [detailDrinks[0].strTags],
        },
      ],
    ));
  }
}

export function setLocalStorageDoneRecipesFoods(detailFoods, date) {
  const previousDoceRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return previousDoceRecipes ? (
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...previousDoceRecipes,
        {
          id: detailFoods[0].idMeal,
          type: 'comida',
          area: detailFoods[0].strArea,
          category: detailFoods[0].strCategory,
          alcoholicOrNot: '',
          name: detailFoods[0].strMeal,
          image: detailFoods[0].strMealThumb,
          doneDate: date,
          tags: [detailFoods[0].strTags],
        },
      ],
    ))
  ) : (localStorage.setItem('doneRecipes', JSON.stringify(
    [
      {
        id: detailFoods[0].idMeal,
        type: 'comida',
        area: detailFoods[0].strArea,
        category: detailFoods[0].strCategory,
        alcoholicOrNot: '',
        name: detailFoods[0].strMeal,
        image: detailFoods[0].strMealThumb,
        doneDate: date,
        tags: [detailFoods[0].strTags],
      },
    ],
  )));
}
