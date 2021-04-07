export const getComidasRandom = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getComidasByName = (nome) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => ({ meals: null }) || console.log(error))
);

export const getBebidasRandom = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getComidasByIngredientes = (ingrediente) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => ({ meals: null }) || console.log(error))
);

export const getComidasByPrimeiraLetra = (primeiraLetra) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => ({ meals: null }) || console.log(error))
);

export const getBebidasByingredientes = (ingrediente) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => ({ drinks: null }) || console.log(error))
);

export const getBebidasByName = (nome) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => ({ drinks: null }) || console.log(error))
);

export const getBebidasByPrimeiraLetra = (primeiraLetra) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => ({ drinks: null }) || console.log(error))
);

export const getAllComida = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getAllBebida = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getComidaCategory = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getBebidaCategory = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getComidaByCategory = (category) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getBebidaByCategory = (category) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getIngredientsFoodList = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getIngredientsDrinkList = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export async function getReceitaBebidasDetalhesPorId(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const details = await response.json();
  return details.drinks;
}

export async function getReceitaComidasDetalhesPorId(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const details = await response.json();
  return details.meals;
}

export const getAreaFoodList = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const getComidaByArea = (area) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export async function getRecomendacoesReceitasBebidas() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const details = await response.json();
  return details.drinks;
}

export async function getRecomendacoesReceitasComidas() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const details = await response.json();
  return details.meals;
}
