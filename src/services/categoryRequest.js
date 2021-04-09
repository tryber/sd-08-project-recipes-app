const categoryRequest = async () => {
  let categoryComidasApi;
  let categoryBebidasApi;

  try {
    const fetchApiComidas = await
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const jsonApiComidas = await fetchApiComidas.json();
    categoryComidasApi = await jsonApiComidas;
  } catch (error) {
    console.log('error');
  }

  try {
    const fetchApiBebidas = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const jsonApiBebidas = await fetchApiBebidas.json();
    categoryBebidasApi = await jsonApiBebidas;
  } catch (error) {
    console.log('error');
  }

  return ({
    categoryComidasApi,
    categoryBebidasApi,
  });
};

export default categoryRequest;
