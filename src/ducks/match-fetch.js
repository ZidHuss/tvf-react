import axios from 'axios';
import moment from 'moment';

const FETCH  = 'fetch/INIT';
const SUCCESS  = 'fetch/SUCCESS';
const FAIL = 'fetch/FAIL';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case FETCH:
      return {...state, isFetching: true};
      break;
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        matches: action.matches
      };
      break;
    case FAIL:
      return {...state, isFetching: false};
    default:
      return state;
  }
}

export function fetchFail() {
  return { type: FAIL };
}

export function fetchInit() {
  return { type: FETCH };
}

export function fetchSuccess(matches) {
  return {
    type: SUCCESS,
    matches
  };
}

export function fetchMatches() {
  return dispatch => {
    dispatch(fetchInit());
    return axios.get('https://tvfootball.zidhuss.tech/api/matches', {
      params: {
        start: moment().format('YYYY-MM-DD'),
        end: moment().add(7, 'days').format('YYYY-MM-DD')
      }
    }).then(response => {
      return dispatch(fetchSuccess(response.data.data));
    }).catch(() => {
      return dispatch(fetchFail());
    });
  };
}
