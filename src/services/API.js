const endpointFoodIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const endpointFoodName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const endpointFoodFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const endpointDrinkIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const endPointDrinkName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const endPointDrinkFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const endPointFoodById = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const endPointDrinkById = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const endPointFoodRandom = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const endPointDrinkRandom = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const filterFoodCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const filterDrinkCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const endPointAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const endPointGetByArea = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const returnAlert = () => {
  alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  return null;
};

export const getFoodIngredients = async (ingredient) => (
  fetch(`${endpointFoodIngredient}${ingredient}`)
    .then((response) => response.json())
    .then(({ meals }) => (meals || returnAlert()))
);

export const getFoodName = async (name) => (
  fetch(`${endpointFoodName}${name}`)
    .then((response) => response.json())
    .then(({ meals }) => (meals || returnAlert()))
);

export const getFoodFirstLetter = async (firstLetter) => (
  fetch(`${endpointFoodFirstLetter}${firstLetter}`)
    .then((response) => response.json())
    .then(({ meals }) => meals)
);

export const getDrinkIngredients = async (ingredient) => (
  fetch(`${endpointDrinkIngredient}${ingredient}`)
    .then((response) => response.json())
    .then(({ drinks }) => (drinks || returnAlert()))
);

export const getDrinkName = async (name) => (
  fetch(`${endPointDrinkName}${name}`)
    .then((response) => response.json())
    .then(({ drinks }) => (drinks || returnAlert()))
);

export const getDrinkFirstLetter = async (firstLetter) => (
  fetch(`${endPointDrinkFirstLetter}${firstLetter}`)
    .then((response) => response.json())
    .then(({ drinks }) => drinks)
);

export const getFoodById = async (id) => (
  fetch(`${endPointFoodById}${id}`)
    .then((response) => response.json())
    .then((meal) => meal)
);

export const getDrinkById = async (id) => (
  fetch(`${endPointDrinkById}${id}`)
    .then((response) => response.json())
    .then((drink) => drink)
);

export const getFoodRandom = async () => {
  const results = await fetch(endPointFoodRandom).then((res) => res.json());
  const { meals } = results;
  // console.log(meals.map((i) => i.strCategory));
  return meals;
};

export const getDrinkRandom = async () => {
  const results = await fetch(endPointDrinkRandom).then((res) => res.json());
  const { drinks } = results;
  return drinks;
};

export const getCategoryFoods = async () => {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((result) => result.json());
  return meals;
};

export const getCategoryDrinks = async () => {
  const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((result) => result.json());
  return drinks;
};

export const getFoodCategory = async (category) => {
  const results = await fetch(`${filterFoodCategory}${category}`)
    .then((res) => res.json());
  const { meals } = results;
  return meals;
};

export const getDrinkCategory = async (category) => {
  const results = await fetch(`${filterDrinkCategory}${category}`)
    .then((res) => res.json());
  const { drinks } = results;
  return drinks;
};

export const surpriseMeAPI = async (api) => {
  const result = await fetch(`https://www.the${api}db.com/api/json/v1/1/random.php`)
    .then((res) => res.json());
  return result;
};

export const getIngredientsAPI = async (api) => {
  const result = await fetch(`https://www.the${api}db.com/api/json/v1/1/list.php?i=list`)
    .then((res) => res.json());
  return result;
};

export const getAreas = async () => {
  const result = await fetch(endPointAreas)
    .then((res) => res.json());
  return result;
};

export const getFoodsByArea = async (area) => {
  const result = await fetch(`${endPointGetByArea}${area}`)
    .then((res) => res.json());
  return result;
};

export const favsLocalStorage = () => {
  const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!getFavsFromLocal) {
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([]));
  }
};

export const ProgressFoodFunc = () => {
  const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!recipesProgress) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        cocktails: {
        },
        meals: {
        },
      }),
    );
  }
};

export const handleUseEffectDetalhes = (id, setFav, setInProgress, type) => {
  const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (getFavsFromLocal.some((recipe) => Number(recipe.id) === Number(id))) {
    setFav(true);
  } else {
    setFav(false);
  }
  const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getInProgress && type) {
    const mealsInLS = Object.keys(getInProgress.meals);
    setInProgress(mealsInLS.some((m) => Number(m) === Number(id)));
  } else if (getInProgress && !type) {
    const cocktailsInLS = Object.keys(getInProgress.cocktails);
    setInProgress(cocktailsInLS.some((ct) => Number(ct) === Number(id)));
  }
};

export const saveDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipes) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([]),
    );
    return [];
  }
  return doneRecipes;
};
