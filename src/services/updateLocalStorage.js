const options = {
  '/comidas': 'meals',
  '/bebidas': 'cocktails',
};

function updateLocalStorage([path, id], array) {
  const englishPath = options[path];
  let currentLocal = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  if (currentLocal[englishPath]) {
    currentLocal[englishPath] = { ...currentLocal[englishPath], [id]: array };
  } else {
    currentLocal = { ...currentLocal,
      [englishPath]: {
        [id]: array,
      } };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(currentLocal));
}

export default updateLocalStorage;
