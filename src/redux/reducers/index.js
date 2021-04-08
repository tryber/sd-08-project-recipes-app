import { combineReducers } from 'redux';
import food from './food';
import drinks from './drinks';
import flags from './flags';

const rootReducers = combineReducers({ foods: food, drinks, flags });

export default rootReducers;
