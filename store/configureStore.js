import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './reducers/userReducer';

const reducers = {
	form: formReducer,
	log: userReducer,
};

const reducer = combineReducers(reducers);

export default createStore(reducer);
