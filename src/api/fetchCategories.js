const categoriesOptions = {
  meals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
};

async function fetchCategories(type) {
  const tempType = type;
  const FIVE_CATEGORYS = 5;
  const resultsJSON = await fetch(categoriesOptions[tempType]);
  const results = await resultsJSON.json();
  return results[tempType].slice(0, FIVE_CATEGORYS);
}

export default fetchCategories;
