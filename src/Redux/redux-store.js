import { createStore } from 'redux';
import { preproccessReducer } from './redux-reducers';

const store = createStore(preproccessReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
