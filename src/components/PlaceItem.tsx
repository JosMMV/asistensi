import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Place } from '../interfaces/PlacesInterface'

interface Props {
  place: Place
  type: 'llegada' | 'partida'
  onPressPlaceHandler: (place: Place) => void
}

const PlaceItem = ({ place, type, onPressPlaceHandler }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPressPlaceHandler(place)}>
      <View style={styles.item}>
        <Text style={styles.text}>{type === 'partida' ? 'Salida' : 'Destino'}: {place.PlaceName} </Text>
        <Text style={styles.text}>País: {place.CountryName}</Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    height: hp(7),
    justifyContent: 'center',
    paddingHorizontal: wp(3)
  },
  text: {
    fontSize: hp(2.2)
  },
  separator: {
    alignSelf: 'center',
    backgroundColor: 'black',
    height: 1,
    width: wp(90)
  }
})

export default PlaceItem
