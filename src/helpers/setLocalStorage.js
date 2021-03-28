export const setMealsToken = () => {
  localStorage.setItem('mealsToken', '1');
};

export const setCocktailsToken = () => {
  localStorage.setItem('cocktailsToken', '1');
};

export const setUser = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};
