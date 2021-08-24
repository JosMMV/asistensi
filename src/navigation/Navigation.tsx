import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'
import SearchFlyScreen from '../screens/SearchFlyScreen'

export type AuthStackParams = {
  Login: undefined
}

export type MainStackParams = {
  SearchFly: undefined
}

const AuthStack = createNativeStackNavigator<AuthStackParams>()

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name='Login' component={LoginScreen} />
    </AuthStack.Navigator>
  )
}

const MainStack = createNativeStackNavigator<MainStackParams>()

export const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name='SearchFly' component={SearchFlyScreen} />
    </MainStack.Navigator>
  )
}