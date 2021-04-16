import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchRecipesMealCatsThunk from '../redux/actions/fetchMealCatRecipesAction';
import { FETCH_CAT_RECIPES } from '../redux/actions/index';
import { fetchChickenCategoryRecipes } from '../TestsMocks/mockMealrecipes';
import { fetchMealInitialRecipes } from '../TestsMocks/mockInitialMeal';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TWELVE = 12;

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchMealCatRecipesAction.js', () => {
  test('async fetchRecipesMealCatsThunk creation action with filter', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchChickenCategoryRecipes }),
    }));
    const expectedActions = [{
      type: FETCH_CAT_RECIPES, payload: { filteredRecipes: fetchChickenCategoryRecipes },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchRecipesMealCatsThunk('Chicken')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('async fetchRecipesMealCatsThunk creation action with no filter', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ meals: fetchMealInitialRecipes }),
    }));
    const expectedActions = [{
      type: FETCH_CAT_RECIPES,
      payload: { filteredRecipes: fetchMealInitialRecipes.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchRecipesMealCatsThunk('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
