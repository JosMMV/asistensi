import React, { createContext, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { authReducer } from './authReducer'

export interface AuthState {
  isLoggedIn: boolean
  didTryAutoLogin: boolean
  username?: string
}

export const authInitialState: AuthState = {
  isLoggedIn: false,
  didTryAutoLogin: false,
  username: undefined
}

export interface AuthContextProps {
  authState: AuthState
  signIn: () => void,
  logout: () => void,
  setDidTryAutoLogin: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const signIn = async () => {
    await AsyncStorage.setItem('logged', 'user')
    dispatch({ type: 'signIn' })
  }

  const logout = async () => {
    await AsyncStorage.setItem('logged', '')
    dispatch({ type: 'logout' })
  }

  const setDidTryAutoLogin = () => {
    dispatch({ type: 'setDidTryAutoLogin' })
  }

  return (
    <AuthContext.Provider value={{
      authState,
      signIn,
      logout,
      setDidTryAutoLogin
    }}>
      {children}
    </AuthContext.Provider>
  )
}