export const endpointLS = {
  mealsToken: 1,
  cocktailsToken: 1,
  user: '',
  doneRecipes: [{
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: '',
  }],
  favoriteRecipes: [{
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  }],
  inProgressRecipes: {
    cocktails: {},
    meals: { },
  },
};

const keyLS = {
  user: JSON.parse(localStorage.getItem('user')),
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes')),
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')),
};

export const loadFromLS = (key) => {
  const formatted = JSON.parse(keyLS[key]);
  return formatted;
};

export const saveToLS = (key, entry) => {
  const formatted = JSON.stringify(entry);
  localStorage.setItem(key, formatted);
};

export const deleteFromLS = (key) => {
  localStorage.removeItem(key);
};

export const clearLS = () => {
  localStorage.clear();
};
