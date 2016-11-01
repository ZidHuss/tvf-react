import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import matchSelectReducer from './match-select'
import matchFetchReducer from './match-fetch'
import gapiAuthReducer from './gapi-auth'

const rootReducer = combineReducers({
  matchSelect: matchSelectReducer,
  matchFetch: matchFetchReducer,
  gapiAuth: gapiAuthReducer
})

const initialState = {
  matchSelect: {
    chosen: null
  },
  matchFetch: {
    isFetching: false
  },
  gapiAuth: {
    signedIn: false
  }
}

 // export default (window.devToolsExtension ?
 //                window.devToolsExtension()(createStore) :
 //                createStore)(rootReducer, initialState, applyMiddleware(thunk))


export default createStore(rootReducer, initialState, applyMiddleware(thunk))
