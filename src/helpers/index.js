export async function fetchFoodApiByName(name) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodApiByArea(area) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodApiByLetter(letter) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodApiById(id) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?i=${id}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchFoodApiByIngredient(ingredient) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json());
  return meals;
}

export async function fetchRandomFood() {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json());
  return meals;
}
