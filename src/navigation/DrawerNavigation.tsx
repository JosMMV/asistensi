import React, { useContext } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

import { InfoNavigation, MainNavigation } from './StackNavigation'

import { AuthContext } from '../context/AuthContext'

const MainDrawer = createDrawerNavigator()

export const DrawerNavigation = () => {
  const { logout } = useContext(AuthContext)

  return (
    <MainDrawer.Navigator
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label='Cerrar sesión' onPress={() => logout()} inactiveTintColor='#ff5537' style={{ top: 5 }} />
          </DrawerContentScrollView>
        )
      }}
    >
      <MainDrawer.Screen name='Main' component={MainNavigation} options={{ title: 'Buscar vuelos' }} />
      <MainDrawer.Screen name='Info' component={InfoNavigation} options={{ title: 'Información general' }} />
    </MainDrawer.Navigator>
  )
}
