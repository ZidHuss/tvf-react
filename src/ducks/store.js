import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import matchSelectReducer from './match-select';
import matchFetchReducer from './match-fetch';

const rootReducer = combineReducers({
  matchSelect: matchSelectReducer,
  matchFetch: matchFetchReducer
});

const initialState = {
  matchSelect: {
    chosen: null
  },
  matchFetch: {
    isFetching: false
  }
};

 // export default (window.devToolsExtension ?
 //                window.devToolsExtension()(createStore) :
 //                createStore)(rootReducer, initialState, applyMiddleware(thunk));


export default createStore(rootReducer, initialState, applyMiddleware(thunk));
