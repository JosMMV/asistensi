import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Carrier, Currency, Place, Quote } from '../interfaces/FliesInterface'

interface Props {
  quote: Quote
  carriers: Carrier[]
  currencies: Currency[]
  places: Place[]
}

const QuoteItem = ({ quote, carriers, currencies, places }: Props) => {
  const origin = places.find(place => place.PlaceId === quote.OutboundLeg.OriginId)
  const destination = places.find(place => place.PlaceId === quote.OutboundLeg.DestinationId)
  const quoteCarriers = quote.OutboundLeg.CarrierIds.map(carrierId => carriers.find(carrier => carrier.CarrierId === carrierId))

  return (
    <View style={styles.item}>

      <Text style={styles.title}>Lugar de salida:</Text>
      <Text style={styles.info}>{origin?.Name}</Text>


      <Text style={styles.title}>Lugar de llegada:</Text>
      <Text style={styles.info}>{destination?.Name}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ borderRightWidth: 1, width: wp(48) - hp(1) }}>
          <Text style={styles.title}>¿Vuelo directo?:</Text>
          <Text style={styles.info}>{quote.Direct ? 'Sí' : 'No'}</Text>
        </View>

        <View style={{ marginLeft: wp(3), width: wp(48) - hp(1) }}>
          <Text style={styles.title}>Precio mínimo:</Text>
          <Text style={styles.info}>{quote.MinPrice}{currencies[0].Code}</Text>
        </View>
      </View>

      <Text style={styles.title}>{quoteCarriers.length > 1 ? 'Aerolineas:' : 'Aerolinea:'}</Text>
      {quoteCarriers.map(quoteCarrier => <Text key={quoteCarrier?.CarrierId.toString()} style={styles.info}>{quoteCarrier?.Name}</Text>)}

      <Text style={styles.title}>Fecha de salida</Text>
      <Text style={styles.info}>{moment(quote.OutboundLeg.DepartureDate).format('DD-MM-YYYY')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    paddingVertical: hp(1),
    width: wp(96)
  },
  title: {
    fontWeight: 'bold',
    fontSize: hp(2.2)
  },
  info: {
    fontSize: hp(1.9),
    marginLeft: wp(1)
  }
})

export default QuoteItem
