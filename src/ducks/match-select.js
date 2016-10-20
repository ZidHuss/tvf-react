const SELECT = 'match-select/MATCH_SELECT'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        chosen: action.matchId
      }
      break
    default:
      return state
  }
}

export function chooseMatch(matchId) {
  return {
    type: SELECT,
    matchId
  }
}
