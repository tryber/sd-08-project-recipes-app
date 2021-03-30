const filterString = {
  Ingredients: 'filter.php?i=',
  'busca por nome': 'search.php?s=',
  'busca da primeira letra': 'search.php?f=',
  filterBy: 'filter.php?c=',
  lookup: 'lookup.php?i=',
  random: 'random.php',
  list: 'list.php?',
  filterArea: 'filter.php?a=',
};

const urlString = {
  '/comidas': 'https://www.themealdb.com/api/json/v1/1/',
  '/bebidas': 'https://www.thecocktaildb.com/api/json/v1/1/',
};

const objParameter = {
  '/comidas': 'meals',
  '/bebidas': 'drinks',
};

async function getResultFromAPI(path, filter = 'busca por nome', text = '') {
  const a = filter;
  const b = path;
  const TWELVE_FILTER = 12;
  const fetchURL = `${urlString[b]}${filterString[a]}${text}`;
  const apiResultJSON = await fetch(fetchURL);
  const apiResult = await apiResultJSON.json();
  if (apiResult.meals === null || apiResult.drinks === null) {
    return null;
  } if (text === 'a=list') {
    return apiResult[objParameter[b]];
  } return apiResult[objParameter[b]].slice(0, TWELVE_FILTER);
}

export default getResultFromAPI;
