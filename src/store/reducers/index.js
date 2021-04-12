import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import headerReducer from './headerReducer';
import drinksReducer from './drinksReducer';
import foodsReducer from './foodsReducer';
import {
  exploreIngredientsReducer,
  exploreRecipesByRegion,
  randomRecipeReducer,
} from './exploreReducers';
import detailsReducers from './detailsReducers';

const reducer = combineReducers({
  loginReducer,
  headerReducer,
  drinksReducer,
  foodsReducer,
  randomRecipeReducer,
  exploreIngredientsReducer,
  exploreRecipesByRegion,
  detailsReducers,
});

export default reducer;
