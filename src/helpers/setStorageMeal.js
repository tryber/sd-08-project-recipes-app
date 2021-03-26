export default function setStorageMeal(props) {
  const { recipe, favorite } = props;
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
  const mealFavorite = {
    id: idMeal,
    type: 'comida',
    alcoholicOrNot: '',
    area: strArea,
    category: strCategory,
    name: strMeal,
    image: strMealThumb,
  };
  if (favorite) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const itemStorage = storage.filter((item) => item.id !== idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
  } else {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (storage) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...storage, mealFavorite]),
      );
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([mealFavorite]));
    }
  }
}
