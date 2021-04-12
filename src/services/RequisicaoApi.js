export async function fetchRecipes(endpoint, searchType, radioValue, inputText) {
  const url = `https://www.${endpoint}.com/api/json/v1/1/${searchType}.php?${radioValue}=${inputText}`;
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return { recipe: null };
  }
}

export async function fetchRecipeDetails(endpoint, recipeId) {
  const url = `https://www.${endpoint}.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return { recipe: null };
  }
}

export async function fetchRecommendations(endpoint) {
  const url = `https://www.${endpoint}.com/api/json/v1/1/search.php?s=`;
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return { recipe: null };
  }
}

export async function fetchRandomRecipe(endpoint) {
  const url = `https://www.${endpoint}.com/api/json/v1/1/random.php`;
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return { recipe: null };
  }
}

export async function fetchListByFilter(endpoint, filter) {
  const url = `https://www.${endpoint}.com/api/json/v1/1/list.php?${filter}=list`;
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return { recipe: null };
  }
}

export async function fetchRecipeByArea(area) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return { recipe: null };
  }
}
