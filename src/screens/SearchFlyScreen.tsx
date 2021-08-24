import React, { useContext, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'

import { AuthContext } from '../context/AuthContext'

import { useCountries } from '../hooks/useCountries'

const SearchFly = () => {
  const { logout } = useContext(AuthContext)

  // const [showDialog, setShowDialog] = useState(false)
  // const [dialogInput, setDialogInput] = useState('')
  const { isLoading, countries, currencies } = useCountries()

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [from, setFrom] = useState('')
  // console.log(countries)

  return (
    <View style={styles.screen}>
      <Text>¿En cuál país se encuentra usted?</Text>
      <View style={styles.pickerContainer}>
        {isLoading ?
          <ActivityIndicator size={hp(3)} color='black' />
          :
          <Picker
            selectedValue={selectedCountry}
            onValueChange={setSelectedCountry}>
            {countries.map((country, index) => <Picker.Item label={country.Name} value={country.Code} key={index.toString()} />)}
          </Picker>
        }
      </View>


      <Text>¿Indique su moneda de preferencia?</Text>
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
      <View>
        <Text>Escriba su lugar de partida</Text>
        <View style={styles.searchPlace}>
          <TextInput
            onChangeText={setFrom}
            style={styles.input}
            value={from}
          />
          <TouchableOpacity style={styles.button}>
            <Text>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* } */}
      <Button title='Logout' onPress={logout} />
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
  button: {
    backgroundColor: '#ff5537',
    alignItems: 'center',
    borderRadius: 10,
    height: hp(5),
    justifyContent: 'center',
    width: wp(20)
  }
})

export default SearchFly
