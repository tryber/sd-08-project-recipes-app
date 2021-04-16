import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchIngredientThunk,
  fetchDrinkIngredientThunk,
  fetchMealIFilterThunk,
  fetchDrinkIFilterThunk,
} from '../redux/actions/fetchIngridientsAction';
import { FETCH_INGREDIENTS, FETCH_API } from '../redux/actions/index';
import { fetchInitialMealIngridients } from '../TestsMocks/mockMealIngredients';
import { fetchInitialDrinkIngridients } from '../TestsMocks/mockDrinkIngredients';
import { fetchSalmonIngredientRecipes } from '../TestsMocks/mockMealrecipes';
import { fetchDrinksByIngredients } from '../TestsMocks/mockDrinkRecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TWELVE = 12;

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchIngredientsAction.js the ingredients', () => {
  test('async fetchIngredientThunk meal creation action', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchInitialMealIngridients }),
    }));
    const expectedIngredientMealActions = [{
      type: FETCH_INGREDIENTS, payload: { ingredients: fetchInitialMealIngridients },
    }];

    const store = mockStore({ ingredients: [] });

    return store.dispatch(fetchIngredientThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedIngredientMealActions);
    });
  });

  test('async fetchDrinkIngredientThunk creation action', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchInitialDrinkIngridients }),
    }));
    const expectedIngredientDrinksActions = [{
      type: FETCH_INGREDIENTS, payload: { ingredients: fetchInitialDrinkIngridients },
    }];

    const store = mockStore({ ingredients: [] });

    return store.dispatch(fetchDrinkIngredientThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedIngredientDrinksActions);
    });
  });
});

describe('fetchIngredientsAction.js the recipes', () => {
  test('async fetchMealIFilterThunk creation action', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchSalmonIngredientRecipes }),
    }));
    const expectedIngredientMealRecipesActions = [{
      type: FETCH_API, payload: { recipes: fetchSalmonIngredientRecipes },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchMealIFilterThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedIngredientMealRecipesActions);
    });
  });

  test('async fetchDrinkIFilterThunk creation action', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchDrinksByIngredients }),
    }));
    const expectedIngredientDrinkRecipesActions = [{
      type: FETCH_API, payload: { recipes: fetchDrinksByIngredients.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchDrinkIFilterThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedIngredientDrinkRecipesActions);
    });
  });
});
