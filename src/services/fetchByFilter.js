const getUrlByFilter = (filter, text) => {
  switch (filter) {
  case 'ingredient':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
  case 'name':
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
  case 'firstletter':
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${text[0]}`;
  default:
    break;
  }
};

const fetchByFilters = async (inputs, setIsLoading, setMealData, location) => {
  const { text, radio } = inputs;
  setIsLoading(true);
  const data = await fetch(getUrlByFilter(radio, text));
  const json = await data.json();
  setIsLoading(false);
  console.log(location);
  if (location.pathname === '/comidas') {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (json.meals === null) {
    setMealData([]);
  } else {
    setMealData(json.meals);
  }
};

export default fetchByFilters;
