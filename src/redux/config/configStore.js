import { createStore } from 'redux';
import { combineReducers } from 'redux';
import reviewsReducer from '../modules/reviewsReducer';
import authReducer from '../modules/authReducer';

const rootReducer = combineReducers({ reviewsReducer, authReducer });
const store = createStore(rootReducer);

export default store;
