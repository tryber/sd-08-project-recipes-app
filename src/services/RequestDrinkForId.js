export default async function getDrink(id) {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const drinks = await data.json();
  const drink = await drinks.drinks;
  const drinkObject = drink[0];
  return drinkObject;
}
