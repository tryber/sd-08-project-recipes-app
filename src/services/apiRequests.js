export async function fetchRandom(URL) {
  const response = await fetch(URL);
  const result = await response.json();

  return result;
}

export default async function getApi(domain, URL) {
  try {
    const response = await fetch(`https://www.${domain}.com/api/json/v1/1/${URL}`);
    const result = await response.json();
    const key = Object.keys(result)[0];
    const recipes = result[key] ? result[key] : 'NF';
    return recipes;
  } catch (error) {
    return 'NF';
  }
}
