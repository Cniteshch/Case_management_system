import { combineReducers } from 'redux';
import DeceasedsReducer from './deceaseds-reducer';
import { reducer as formReducer } from 'redux-form';


// connecting both reducers using combineReducers.

const reducers = {
  deceasedStore: DeceasedsReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
