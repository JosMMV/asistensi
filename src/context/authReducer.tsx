import { authInitialState, AuthState } from './AuthContext'

type AuthAction =
  { type: 'signIn' } |
  { type: 'logout' } |
  { type: 'setDidTryAutoLogin' }

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

    case 'setDidTryAutoLogin':
      return {
        ...state,
        didTryAutoLogin: true
      }
    default:
      return state
  }
}