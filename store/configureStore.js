import { createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default createStore(formReducer);
