import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { AuthProvider } from './src/context/AuthContext'
import AppNavigator from './src/navigation/AppNavigator'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  })

  return (
    <AppState>
      <AppNavigator />
    </AppState>
  )
}

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}


export default App
