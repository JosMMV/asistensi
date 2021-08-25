import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { AuthProvider } from './src/context/AuthContext'
import { FlyProvider } from './src/context/FlyContext'
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
      <FlyProvider>
        {children}
      </FlyProvider>
    </AuthProvider>
  )
}


export default App
