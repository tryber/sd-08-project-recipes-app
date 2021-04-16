import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchRecipesDrinkCatsThunk from '../redux/actions/fetchDrinkCatRecipesAction';
import { FETCH_CAT_RECIPES } from '../redux/actions/index';
import { fetchCocktailCategoryRecipes } from '../TestsMocks/mockDrinkRecipes';
import { fetchCocktailInitialRecipes } from '../TestsMocks/mockInitialDrinks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TWELVE = 12;

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('fetchDrinkCatRecipesAction.js', () => {
  test('async fetchRecipesDrinkCatsThunk creation action with filter', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchCocktailCategoryRecipes }),
    }));
    const expectedActions = [{
      type: FETCH_CAT_RECIPES, payload: { filteredRecipes: fetchCocktailCategoryRecipes },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchRecipesDrinkCatsThunk('Cocktail')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('async fetchRecipesDrinkCatsThunk creation action with no filter', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: fetchCocktailInitialRecipes }),
    }));
    const expectedActions = [{
      type: FETCH_CAT_RECIPES,
      payload: { filteredRecipes: fetchCocktailInitialRecipes.slice(0, TWELVE) },
    }];

    const store = mockStore({ recipes: [] });

    return store.dispatch(fetchRecipesDrinkCatsThunk('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
