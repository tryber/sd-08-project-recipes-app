export default function setStorageDrink(props) {
  const { recipe, favorite } = props;
  const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = recipe;
  const drinkFavorite = {
    id: idDrink,
    type: 'bebida',
    alcoholicOrNot: strAlcoholic,
    area: '',
    category: strCategory,
    name: strDrink,
    image: strDrinkThumb,
  };
  if (favorite) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const itemStorage = storage.filter((item) => item.id !== idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
  } else {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (storage) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...storage, drinkFavorite]),
      );
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([drinkFavorite]));
    }
  }
}
