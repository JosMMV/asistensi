import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import InfoScreen from '../screens/InfoScreen'
import ListPlacesScreen from '../screens/ListPlacesScreen'
import LoginScreen from '../screens/LoginScreen'
import ResultFlyesScreen from '../screens/ResultFlyesScreen'
import SearchFlyScreen from '../screens/SearchFlyScreen'

export type AuthStackParams = {
  Login: undefined
}

export type MainStackParams = {
  SearchFly: undefined
  ListPlaces: {
    selectedCountry: string
    selectedCurrency: string
    query: string
    type: 'llegada' | 'partida'
  }
  ResultFlyes: {
    country: string
    currency: string
    from: string | undefined
    to: string | undefined
    outboundpartialdate: string
  }
}

export type InfoStackParams = {
  Info: undefined
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
    <MainStack.Navigator>
      <MainStack.Screen name='SearchFly' component={SearchFlyScreen} options={{ headerShown: false }} />
      <MainStack.Screen name='ListPlaces' component={ListPlacesScreen} options={{ headerShown: false }} />
      <MainStack.Screen name='ResultFlyes' component={ResultFlyesScreen} options={{ headerShown: false }} />
    </MainStack.Navigator>
  )
}

const InfoStack = createNativeStackNavigator<InfoStackParams>()

export const InfoNavigation = () => {
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen name='Info' component={InfoScreen} options={{ headerShown: false }} />
    </InfoStack.Navigator>
  )
}