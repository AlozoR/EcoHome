import { createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

export const store = createStore(formReducer);
