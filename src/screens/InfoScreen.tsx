import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const InfoScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Alguna información</Text>
    </View>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
