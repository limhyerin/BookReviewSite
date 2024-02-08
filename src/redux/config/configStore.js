import { createStore } from 'redux';
import { combineReducers } from 'redux';
import reviewsReducer from '../modules/reviewsReducer';
const rootReducer = combineReducers({ reviewsReducer });
const store = createStore(rootReducer);

export default store;
