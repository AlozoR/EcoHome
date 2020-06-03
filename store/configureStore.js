import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './reducers/userReducer';
import renderReducer from './reducers/renderReducer';

const reducers = {
	form: formReducer,
	log: userReducer,
	render: renderReducer,
};

const reducer = combineReducers(reducers);

export default createStore(reducer);
