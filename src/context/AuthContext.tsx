import React, { createContext, useReducer } from 'react'
import { authReducer } from './authReducer'

// Definir cómo luce, qué información tendré aquí
export interface AuthState {
  isLoggedIn: boolean
  username?: string
  // favoriteIcon?: string
}

// Estado inicial
export const authInitialState: AuthState = {
  isLoggedIn: false,
  username: undefined,
  // favoriteIcon: undefined
}

// Lo usaremos para decirle a React cómo luce y qué expone el context
export interface AuthContextProps {
  authState: AuthState
  signIn: () => void,
  // changeFavIcon: (iconName: string) => void,
  logout: () => void,
  // changeUsername: (username: string) => void
}

// Crear el contexto
export const AuthContext = createContext({} as AuthContextProps)

// Componente proveedor del estado

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const signIn = () => {
    dispatch({ type: 'signIn' })
  }

  // const changeFavIcon = (iconName: string) => {
  //   dispatch({ type: 'changeFavIcon', payload: iconName })
  // }

  const logout = () => {
    dispatch({ type: 'logout' })
  }

  // const changeUsername = (username: string) => {
  //   dispatch({ type: 'changeUsername', payload: username })
  // }

  return (
    <AuthContext.Provider value={{
      authState,
      signIn,
      // changeFavIcon,
      logout,
      // changeUsername
    }}>
      {children}
    </AuthContext.Provider>
  )
}