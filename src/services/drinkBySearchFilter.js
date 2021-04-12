const getUrlByFilter = (filter, text) => {
  switch (filter) {
  case 'ingredient':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
  case 'name':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
  case 'firstletter':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text[0]}`;
  default:
    break;
  }
};

const fetchByDrinkFilters = async (inputs, setIsLoading, setDrinkData, location) => {
  const { text, radio } = inputs;
  setIsLoading(true);
  const data = await fetch(getUrlByFilter(radio, text));
  const json = await data.json();
  setIsLoading(false);
  if (location.pathname === '/bebidas') {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (json.drinks === null) {
    setDrinkData([]);
  } else {
    setDrinkData(json.drinks);
  }
};

export default fetchByDrinkFilters;
