import React, { useContext } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/StackNavigation'

import { usePlaces } from '../hooks/usePlaces'

import { Place } from '../interfaces/PlacesInterface'

import { FlyContext } from '../context/FlyContext'
import PlaceItem from '../components/PlaceItem'

interface Props extends NativeStackScreenProps<MainStackParams, 'ListPlaces'> { }

const ListPlacesScreen = ({ navigation, route }: Props) => {
  const { setFrom, setTo } = useContext(FlyContext)

  const { selectedCountry, selectedCurrency, query, type } = route.params
  const { places, isLoading } = usePlaces(selectedCountry, selectedCurrency, query)


  const onPressPlaceHandler = (place: Place) => {
    type === 'partida' ? setFrom(place) : setTo(place)
    navigation.pop()
  }

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color='black' size='large' />
      </View>
    )
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item: place }) => (<PlaceItem onPressPlaceHandler={onPressPlaceHandler} place={place} type={type} />)}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ListPlacesScreen

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
