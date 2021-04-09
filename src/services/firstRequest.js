const firstRequest = async () => {
  let comidasApi;
  let bebidasApi;

  try {
    const fetchApiComidas = await
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const jsonApiComidas = await fetchApiComidas.json();
    comidasApi = await jsonApiComidas;
  } catch (error) {
    console.log('error');
  }

  try {
    const fetchApiBebidas = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const jsonApiBebidas = await fetchApiBebidas.json();
    bebidasApi = await jsonApiBebidas;
  } catch (error) {
    console.log('error');
  }

  return ({
    comidasApi,
    bebidasApi,
  });
};

export default firstRequest;
