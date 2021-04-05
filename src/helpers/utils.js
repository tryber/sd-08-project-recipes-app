const mapRecipe = (favorite) => ({
  id: favorite.idMeal || favorite.idDrink,
  type: favorite.idMeal ? 'comida' : 'bebida',
  area: favorite.strArea || '',
  category: favorite.strCategory || '',
  alcoholicOrNot: favorite.strAlcoholic || '',
  name: favorite.strMeal || favorite.strDrink,
  image: favorite.strMealThumb || favorite.strDrinkThumb || '',
});

export default mapRecipe;
