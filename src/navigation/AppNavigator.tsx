import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthNavigation } from './StackNavigation'
import { DrawerNavigation } from './DrawerNavigation'

import { AuthContext } from '../context/AuthContext'
import StartUpScreen from '../screens/StartUpScreen'

const AppNavigator = () => {
  const { authState: { isLoggedIn, didTryAutoLogin } } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {isLoggedIn && didTryAutoLogin && <DrawerNavigation />}
      {!isLoggedIn && didTryAutoLogin && <AuthNavigation />}
      {!isLoggedIn && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator