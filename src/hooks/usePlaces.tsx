import { useEffect, useState } from 'react'

import { skyScanner } from '../api/skyScanner'
import { Place, Places } from '../interfaces/PlacesInterface'

interface PlacesDef {
  isLoading: boolean
  places: Place[]
}

export const usePlaces = (country: string, currency: string, query: string) => {
  const [state, setState] = useState<PlacesDef>({
    isLoading: true,
    places: []
  })

  useEffect(() => {
    getPlaces()
  }, [])

  const getPlaces = async () => {
    const placesRes = await skyScanner.get<Places>(`/autosuggest/v1.0/${country}/${currency}/es-ES/?query=${query}`)

    setState({
      isLoading: false,
      places: placesRes.data.Places
    })
  }

  return {
    ...state
  }
}