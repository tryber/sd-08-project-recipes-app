const filterCategoryRequest = async (name) => {
  let foodRequest;
  let drinkRequest;

  try {
    const fetchApi = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const apiJson = await fetchApi.json();
    foodRequest = await apiJson.meals;
  } catch (error) {
    console.log(error);
  }

  try {
    const fetchApi = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
    const apiJson = await fetchApi.json();
    drinkRequest = await apiJson.drinks;
  } catch (error) {
    console.log(error);
  }

  return ({ foodRequest, drinkRequest });
};

export default filterCategoryRequest;
