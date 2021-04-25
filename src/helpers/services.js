const URLFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URLList = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const fetchAPIFood = async () => {
  try {
    const response = await fetch(URLFood);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchListArea = async () => {
  try {
    const request = await fetch(URLList);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFoodsAreaName = async (name) => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};
