import { combineReducers } from 'redux';

import { search } from './search';
import { recipesInProgress, recipesDone } from './recipeStatus';

export default combineReducers({
  search,
  recipesInProgress,
  recipesDone,
});
