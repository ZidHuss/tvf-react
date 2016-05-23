const ENTER = 'search/ENTER';
const LEAVE = 'search/LEAVE';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ENTER:
      return { ...state, search: false };
      break;
    case LEAVE:
      return { ...state, search: true };
    default:
      return state;
  }
}

export function enterSearchMode() {
  return { type: ENTER };
}

export function leaveSearchMode() {
  return { type: LEAVE };
}
