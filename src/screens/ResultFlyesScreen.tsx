import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useFlies } from '../hooks/useFlies'

import { MainStackParams } from '../navigation/StackNavigation'

import QuoteItem from '../components/QuoteItem'

interface Props extends NativeStackScreenProps<MainStackParams, 'ResultFlyes'> { }

const ResultFlyesScreen = ({ route }: Props) => {
  const { country, currency, from, to, outboundpartialdate } = route.params

  const { isLoading, quotes, carriers, currencies, places } = useFlies(country, currency, from, to, outboundpartialdate)

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color='black' size='large' />
      </View>
    )
  }

  return (
    <View>
      <Text style={styles.title}>Vuelos</Text>
      <FlatList
        data={quotes}
        renderItem={({ item: quote }) => <QuoteItem quote={quote} carriers={carriers} currencies={currencies} places={places} />}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: hp(7), paddingBottom: hp(2) }}
      />
    </View>
  )
}

export default ResultFlyesScreen

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: hp(3.5),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp(1)
  }
})
