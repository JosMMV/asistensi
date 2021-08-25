import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { FlyContext } from '../context/FlyContext'

import { useCountries } from '../hooks/useCountries'

import { MainStackParams } from '../navigation/StackNavigation'

interface Props extends NativeStackScreenProps<MainStackParams, 'SearchFly'> { }

const SearchFly = ({ navigation }: Props) => {
  const { flyState: { from, to }, setFrom, setTo } = useContext(FlyContext)
  const { isLoading, countries, currencies } = useCountries()

  // const [showDialog, setShowDialog] = useState(false)
  // const [dialogInput, setDialogInput] = useState('')

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [fromInput, setFromInput] = useState('')
  const [toInput, setToInput] = useState('')
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const showDatepicker = () => {
    setShow(true)
  }
  // console.log(countries)

  const searchPlacesHandler = (type: 'partida' | 'llegada') => {
    try {
      if (!selectedCountry) throw new Error('Selecione su país actual')
      if (!selectedCurrency) throw new Error('Selecione su moneda de preferencia')
      if (type === 'partida') {
        if (!fromInput) throw new Error(`Ingrese su lugar de ${type}`)
        setFromInput('')
      } else {
        if (!toInput) throw new Error(`Ingrese su lugar de ${type}`)
        setToInput('')
      }

      navigation.navigate('ListPlaces', { selectedCountry, selectedCurrency, query: type === 'partida' ? fromInput : toInput, type })
    } catch (err) {
      Alert.alert('', err.message)
    }
  }

  const searchFliesHandler = (type: 'exact' | 'byMonth') => {
    navigation.navigate('ResultFlyes', {
      country: selectedCountry,
      currency: selectedCurrency,
      from: from?.PlaceId,
      to: to?.PlaceId,
      outboundpartialdate: type === 'exact' ? moment(date).format('YYYY-MM-DD') : moment(date).format('YYYY-MM')
    })
  }

  useEffect(() => {
    if (countries.length > 0) setSelectedCountry(countries[0].Code)
  }, [countries])

  useEffect(() => {
    if (currencies.length > 0) {
      const hasUSD = currencies.some(currency => currency.Code === 'USD')
      hasUSD ? setSelectedCurrency('USD') : setSelectedCurrency(currencies[0].Code)
    }
  }, [currencies])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>¿En cuál país se encuentra usted?</Text>
      <View style={styles.pickerContainer}>
        {isLoading ?
          <ActivityIndicator size={hp(3)} color='black' />
          :
          <Picker
            selectedValue={selectedCountry}
            onValueChange={country => {
              setSelectedCountry(country)
              setFrom(undefined)
              setTo(undefined)
            }}
            style={styles.picker}
          >
            {countries.map((country, index) => <Picker.Item label={country.Name} value={country.Code} key={index.toString()} />)}
          </Picker>
        }
      </View>


      <Text style={styles.title}>Indique su moneda de preferencia</Text>
      <View style={styles.pickerContainer}>
        {isLoading ?
          <ActivityIndicator size={hp(3)} color='black' style={{ paddingTop: hp(1.5) }} />
          :
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={setSelectedCurrency}>
            {currencies.map((currency, index) => <Picker.Item label={currency.Code} value={currency.Code} key={index.toString()} />)}
          </Picker>
        }
      </View>

      {/* {selectedCountry.length > 0 && selectedCurrency.length > 0 && */}

      <Text style={styles.title}>Escriba su lugar de partida</Text>
      <View style={styles.searchPlace}>
        <TextInput
          onChangeText={setFromInput}
          onSubmitEditing={() => searchPlacesHandler('partida')}
          placeholder='Lugar de partida'
          style={styles.input}
          value={fromInput}
        />
        <TouchableOpacity
          onPress={() => searchPlacesHandler('partida')}
          style={styles.searchPlaceButton}
        >
          <Text style={styles.textButton}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {!!from && <Text style={styles.info}>{from.PlaceName} - {from.CountryName}</Text>}
      {/* } */}

      {/* {selectedCountry.length > 0 && selectedCurrency.length > 0 && */}
      <Text style={styles.title}>Escriba su lugar de llegada</Text>
      <View style={styles.searchPlace}>
        <TextInput
          onChangeText={setToInput}
          onSubmitEditing={() => searchPlacesHandler('llegada')}
          placeholder='Lugar de llegada'
          style={styles.input}
          value={toInput}
        />
        <TouchableOpacity
          onPress={() => searchPlacesHandler('llegada')}
          style={styles.searchPlaceButton}
        >
          <Text style={styles.textButton}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {!!to && <Text style={styles.info}>{to.PlaceName} - {to.CountryName}</Text>}
      {/* } */}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity style={{ ...styles.searchPlaceButton, marginVertical: hp(3), width: wp(60) }} onPress={showDatepicker}>
        <Text style={styles.textButton}>Seleccionar fecha de salida</Text>
      </TouchableOpacity>
      <Text style={styles.info}>{moment(date).format('DD-MM-YYYY')}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp(95) }}>
        <TouchableOpacity style={styles.searchFliesButton} onPress={() => searchFliesHandler('exact')}>
          <Text style={styles.textButton}>Buscar vuelos en fecha exacta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchFliesButton} onPress={() => searchFliesHandler('byMonth')}>
          <Text style={styles.textButton}>Buscar vuelos en el mes</Text>
        </TouchableOpacity>
      </View>

      {/* <Button title='Logout' onPress={logout} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerContainer: {
    height: hp(7),
    width: wp(50)
  },
  picker: {
    alignSelf: 'center',
    width: wp(70)
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    textAlign: 'left',
    width: wp(95)
  },
  searchPlace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp(90)
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: hp(2),
    marginVertical: hp(1.5),
    paddingHorizontal: wp(2),
    width: wp(40)
  },
  searchPlaceButton: {
    backgroundColor: '#ff5537',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    height: hp(5),
    justifyContent: 'center',
    width: wp(20)
  },
  searchFliesButton: {
    backgroundColor: '#ff5537',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    height: hp(7),
    marginVertical: hp(3),
    paddingHorizontal: wp(2),
    width: wp(40)
  },
  textButton: {
    fontSize: hp(2),
    textAlign: 'center'
  },
  info: {
    fontSize: hp(2),
    fontWeight: '700',
    marginBottom: hp(2)
  }
})

export default SearchFly
