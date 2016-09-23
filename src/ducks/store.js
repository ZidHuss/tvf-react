import { createStore, combineReducers } from 'redux';
import matchSelectReducer from './match-select';

const rootReducer = combineReducers({
  matchSelect: matchSelectReducer
});

const initialState = {
  matchSelect: {
    chosen: null
  }
};

export default (window.devToolsExtension ?
               window.devToolsExtension()(createStore) :
               createStore)(rootReducer, initialState);

// export default createStore(rootReducer, initialState);
