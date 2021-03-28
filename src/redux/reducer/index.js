import { combineReducers } from 'redux';

import FilteredRecipes from './FilteredRecipes';
import Loading from './Loading';
import MainRecipes from './MainRecipes';
import CategoriesRecipes from './CategoriesRecipes';
import FilterByCategory from './FilterByCategory';

// FIXME:   Nunca deveria haver um stado/reducer em PascalCase.

const rootReducers = combineReducers({
  FilteredRecipes,
  Loading,
  MainRecipes,
  CategoriesRecipes,
  FilterByCategory,
});

export default rootReducers;
