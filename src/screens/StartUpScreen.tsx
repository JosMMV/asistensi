import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'

const StartUpScreen = () => {
  const { signIn, setDidTryAutoLogin } = useContext(AuthContext)

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await AsyncStorage.getItem('logged')
      if (!!logged) signIn()
      setDidTryAutoLogin()
    }
    checkLogin()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color='black' size='large' />
    </View>
  )
}

export default StartUpScreen
