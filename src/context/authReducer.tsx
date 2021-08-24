import { authInitialState, AuthState } from './AuthContext'

type AuthAction =
  { type: 'signIn' } |
  // { type: 'changeFavIcon', payload: string } |
  { type: 'logout' } //|
// { type: 'changeUsername', payload: string }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        isLoggedIn: true,
        username: 'Asistensi'
      }
    // case 'changeFavIcon':
    //   return {
    //     ...state,
    //     favoriteIcon: action.payload
    //   }
    case 'logout':
      return authInitialState
    // case 'changeUsername':
    //   return {
    //     ...state,
    //     username: action.payload
    //   }

    default:
      return state
  }
}