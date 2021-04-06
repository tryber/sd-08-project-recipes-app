import DateFormatter from '../lib/utils';

export const initializeLocalStorageTokens = () => {
  // Here is already created and commented the logic to check if those localStorage keys already exist
  // const storageMealsToken = localStorage.getItem('mealsToken');
  // const storageCocktailsToken = localStorage.getItem('cocktailsToken');
  // if (!storageMealsToken && !storageCocktailsToken) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  // }
};

export const saveUserEmailInLocalStorage = (email) => {
  const localStorageUser = JSON.stringify({ email });
  localStorage.setItem('user', localStorageUser);
};

export const getUserEmail = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.email) return user.email;
  return '';
};

export const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipes) return [];
  return doneRecipes;
};

export const checkProgressRecipes = (type, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let result = '';
  if (inProgressRecipes) {
    switch (type) {
    case 'meal':
      result = Object.keys(inProgressRecipes.meals)
        .find((key) => key.toString() === id);
      break;
    case 'cocktail':
      result = Object.keys(inProgressRecipes.cocktails)
        .find((key) => key.toString() === id);
      break;
    default:
      result = '';
    }
  }
  return result;
};

export const removeDoneFromInProgress = (type, id) => {
  const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (type === 'meal') {
    delete meals[id];
  }
  if (type === 'drink') {
    delete cocktails[id];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    cocktails,
    meals,
  }));
};

export const checkDoneRecipes = (type, id) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const result = doneRecipes
    ? doneRecipes
      .filter((mixedRecipe) => mixedRecipe.type === type)
      .find((recipe) => recipe.id.toString() === id)
    : '';
  return result;
};

export const saveDoneRecipe = (recipe) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  let newDone;
  if (recipe.idMeal) {
    newDone = {
      id: recipe.idMeal,
      type: 'meal',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: DateFormatter.now(),
      tags: recipe.strTags ? recipe.strTags.replace(/"/g, '').split(',') : [],
    };
    removeDoneFromInProgress('meal', recipe.idMeal);
  } else {
    newDone = {
      id: recipe.idDrink,
      type: 'drink',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: DateFormatter.now(),
      tags: recipe.strTags ? recipe.strTags.replace(/"/g, '').split(',') : [],
    };
    removeDoneFromInProgress('drink', recipe.idDrink);
  }
  if (doneRecipes) {
    doneRecipes.push(newDone);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  } else localStorage.setItem('doneRecipes', JSON.stringify([newDone]));
};

export const checkFavoriteRecipes = (type, id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const result = favoriteRecipes
    ? favoriteRecipes
      .filter((mixedRecipe) => mixedRecipe.type === type)
      .find((recipe) => recipe.id.toString() === id)
    : '';
  return result;
};

export const saveFavoriteRecipe = (recipe) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorite = recipe.idMeal
    ? {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }
    : {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  if (favoriteRecipes) {
    favoriteRecipes.push(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  } else localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
};

export const getFavoriteRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoriteRecipes) return [];
  return favoriteRecipes;
};

export const removeFavoritedRecipe = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const result = favoriteRecipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(result));
};

export const updateInProgressRecipe = (type, id, ingredient) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes[type][id]) {
    if (inProgressRecipes[type][id].includes(ingredient)) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]: inProgressRecipes[type][id].filter((item) => item !== ingredient),
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]: [...inProgressRecipes[type][id], ingredient],
        },
      }));
    }
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id]: [ingredient],
      },
    }));
  }
};

export const getInProcessRecipe = (type, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
    return [];
  }
  if (inProgressRecipes[type][id]) {
    return inProgressRecipes[type][id];
  }
  return [];
};
