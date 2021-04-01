import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import example from './reducers/example.reducer';
import user from './reducers/user.reducer';
import categories from './reducers/categories.reducer';
import meals from './reducers/meals.reducer';
import drinks from './reducers/drinks.reducer';
import favoriteRecipes from './reducers/favoriteRecipes.reducer';

const rootReducer = combineReducers({
  example,
  user,
  categories,
  meals,
  drinks,
  favoriteRecipes,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
