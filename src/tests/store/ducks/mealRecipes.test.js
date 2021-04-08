import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../store/ducks';
import { Creators as MealRecipesActions } from '../../../store/ducks/mealRecipes';

const fetchMock = require('../../../../cypress/mocks/fetch');
const mealsMock = require('../../../../cypress/mocks/meals');
const mealsByIngredientMock = require('../../../../cypress/mocks/mealsByIngredient');
const beefMealsMock = require('../../../../cypress/mocks/beefMeals');
const italianMealsMock = require('../../../../cypress/mocks/italianMeals');

window.fetch = fetchMock;

afterEach(jest.clearAllMocks);

describe('mealRecipes reducer', () => {
  test('fetch', () => {
    const store = createStore(rootReducer);
    expect(store.getState().meals.recipes.isFetching).not.toBeTruthy();
    store.dispatch(MealRecipesActions.fetch());
    expect(store.getState().meals.recipes.isFetching).toBeTruthy();
  });

  test('fetchSuccess', () => {
    const store = createStore(rootReducer);
    const expected = [{ someKey: 'someProperty' }];
    expect(store.getState().meals.recipes.recipes.length).toBe(0);
    store.dispatch(MealRecipesActions.fetchSuccess(expected));
    expect(store.getState().meals.recipes.recipes.length).toBe(1);
  });

  test('fetchError', () => {
    const store = createStore(rootReducer);
    const ERROR = 'ERROR';
    expect(store.getState().meals.recipes.error).toBe('');
    store.dispatch(MealRecipesActions.fetchError(ERROR));
    expect(store.getState().meals.recipes.error).toBe(ERROR);
  });

  test('fetchRecipes', async () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    expect(store.getState().meals.recipes.recipes.length).toBe(0);
    await store.dispatch(MealRecipesActions.fetchRecipes());
    expect(store.getState().meals.recipes.recipes).toBe(mealsMock.meals);
  });

  test('fetchRecipesByIngredient', async () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    expect(store.getState().meals.recipes.recipes.length).toBe(0);
    await store.dispatch(MealRecipesActions.fetchRecipesByIngredient('Chicken'));
    expect(store.getState().meals.recipes.recipes).toBe(mealsByIngredientMock.meals);
  });

  test('fetchRecipesByCategory', async () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    expect(store.getState().meals.recipes.recipes.length).toBe(0);
    await store.dispatch(MealRecipesActions.fetchRecipesByCategory('Beef'));
    expect(store.getState().meals.recipes.recipes).toBe(beefMealsMock.meals);
  });

  test('fetchRecipesByArea', async () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    expect(store.getState().meals.recipes.recipes.length).toBe(0);
    await store.dispatch(MealRecipesActions.fetchRecipesByArea('Italian'));
    expect(store.getState().meals.recipes.recipes).toBe(italianMealsMock.meals);
  });
});
