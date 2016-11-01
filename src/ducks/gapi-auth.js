const SIGN_IN = 'gapi-auth/SIGN_IN'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signedIn: true
      }
    default:
      return state
  }
}

export function signIn() {
  return {
    type: SIGN_IN
  }
}
