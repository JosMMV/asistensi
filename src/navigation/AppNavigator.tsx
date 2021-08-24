import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthNavigation, MainNavigation } from './Navigation'
import { AuthContext } from '../context/AuthContext'

const AppNavigator = () => {
  const { authState: { isLoggedIn } } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {isLoggedIn && <MainNavigation />}
      {!isLoggedIn && <AuthNavigation />}
      {/* {!isLoggedIn && !didTryAutoLogin && <StartupScreen />} */}
    </NavigationContainer>
  )
}

export default AppNavigator