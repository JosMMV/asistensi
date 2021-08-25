import { useEffect, useState } from 'react'

import { skyScanner } from '../api/skyScanner'
import { Carrier, Currency, Fly, Place, Quote } from '../interfaces/FliesInterface'

interface FliesDef {
  isLoading: boolean
  quotes: Quote[]
  carriers: Carrier[]
  places: Place[]
  currencies: Currency[]
}

export const useFlies = (country: string, currency: string, from: string | undefined, to: string | undefined, outboundpartialdate: string) => {
  const [state, setState] = useState<FliesDef>({
    isLoading: true,
    quotes: [],
    carriers: [],
    places: [],
    currencies: []
  })

  useEffect(() => {
    getFlies()
  }, [])

  const getFlies = async () => {
    const fliesRes = await skyScanner.get<Fly>(`/browsequotes/v1.0/${country}/${currency}/es-ES/${from}/${to}/${outboundpartialdate}`)

    setState({
      isLoading: false,
      quotes: fliesRes.data.Quotes,
      carriers: fliesRes.data.Carriers,
      places: fliesRes.data.Places,
      currencies: fliesRes.data.Currencies
    })
  }

  return {
    ...state
  }
}