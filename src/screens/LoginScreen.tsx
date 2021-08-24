import React, { useContext, useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { AuthContext } from '../context/AuthContext'

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const passwordRef = useRef<TextInput | null>(null)

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Ingrese su usuario</Text>
      <TextInput
        onChangeText={setUsername}
        onSubmitEditing={() => passwordRef.current?.focus()}
        returnKeyType='next'
        placeholder='Usuario'
        style={styles.input}
        value={username}
      />
      <Text style={styles.title}>Ingrese su contraseña</Text>
      <TextInput
        onChangeText={setPassword}
        placeholder='Contraseña'
        ref={r => passwordRef.current = r}
        secureTextEntry={true}
        style={styles.input}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.textButton}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: hp(2.7)
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: hp(2.2),
    marginVertical: hp(1.5),
    paddingHorizontal: wp(2),
    width: wp(80)
  },
  button: {
    backgroundColor: '#ff5537',
    alignItems: 'center',
    borderRadius: 10,
    height: hp(4.5),
    justifyContent: 'center',
    width: wp(40)
  },
  textButton: {
    fontSize: hp(2.5),
    fontWeight: 'bold'
  }
})

export default LoginScreen
