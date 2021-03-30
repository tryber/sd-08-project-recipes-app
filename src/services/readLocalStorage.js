const options = {
  '/comidas': 'meals',
  '/bebidas': 'cocktails',
};

function readLocalStorage([path, id]) {
  const englishPath = options[path];
  const currentLocal = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  if (currentLocal[englishPath]) {
    return currentLocal[englishPath][id] || [];
  }
  return [];
}

export default readLocalStorage;
