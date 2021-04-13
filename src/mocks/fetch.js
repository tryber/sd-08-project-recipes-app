const meals = require('./meals');
const oneMeal = require('./oneMeal');
const soupMeals = require('./soupMeals');
const beefMeals = require('./beefMeals');
const breakfastMeals = require('./breakfastMeals');
const chickenMeals = require('./chickenMeals');
const dessertMeals = require('./dessertMeals');
const goatMeals = require('./goatMeals');
const emptyMeals = require('./emptyMeals');
const mealCategories = require('./mealCategories');
const mealIngredients = require('./mealIngredients');
const mealsByIngredient = require('./mealsByIngredient');
const drinks = require('./drinks');
const oneDrink = require('./oneDrink');
const ginDrinks = require('./ginDrinks');
const lemonDrinks = require('./lemonDrinks');
const ordinaryDrinks = require('./ordinaryDrinks');
const cocktailDrinks = require('./cocktailDrinks');
const milkDrinks = require('./milkDrinks');
const otherDrinks = require('./otherDrinks');
const cocoaDrinks = require('./cocoaDrinks');
const emptyDrinks = require('./emptyDrinks');
const drinkCategories = require('./drinkCategories');
const drinkIngredients = require('./drinkIngredients');
const drinksByIngredient = require('./drinksByIngredient');
const areas = require('./areas');
const japaneseMeals = require('./japaneseMeals');
const italianMeals = require('./italianMeals');

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(mealCategories); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(drinkCategories); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(mealIngredients); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') { return Promise.resolve(mealsByIngredient); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(drinkIngredients); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') { return Promise.resolve(drinksByIngredient); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') { return Promise.resolve(areas); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese') { return Promise.resolve(japaneseMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian') { return Promise.resolve(italianMeals); }

        if (
          url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
          || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
          || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
        ) { return Promise.resolve(oneMeal); }

        if (
          url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
          || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
          || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
        ) { return Promise.resolve(oneDrink); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') { return Promise.resolve(soupMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve(beefMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') { return Promise.resolve(breakfastMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') { return Promise.resolve(chickenMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') { return Promise.resolve(dessertMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') { return Promise.resolve(goatMeals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') { return Promise.resolve(emptyMeals); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin') { return Promise.resolve(ginDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon') { return Promise.resolve(lemonDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') { return Promise.resolve(ordinaryDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') { return Promise.resolve(cocktailDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake') { return Promise.resolve(milkDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') { return Promise.resolve(otherDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') { return Promise.resolve(cocoaDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau') { return Promise.resolve(emptyDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinks); }

        return Promise.resolve(meals);
      },
    }));
};
module.exports = mockFetch;
