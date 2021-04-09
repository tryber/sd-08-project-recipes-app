async function requestById(id, type) {
  let sucess;

  if (type === 'comidas') {
    try {
      const fetchApi = await
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const jsonApi = await fetchApi.json();
      sucess = await jsonApi;
    } catch (error) {
      console.log('erro na requestById comida', error);
    }
  } else {
    try {
      const fetchApi = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const jsonApi = await fetchApi.json();
      sucess = await jsonApi;
    } catch (error) {
      console.log('erro na requestById bebida', error);
    }
  }

  return sucess;
}

export default requestById;
