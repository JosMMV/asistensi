import { useEffect, useState } from 'react'

import { skyScanner } from '../api/skyScanner'
import { Country, CountryElement } from '../interfaces/CountriesInterface'
import { Currency, CurrencyElement } from '../interfaces/CurrenciesInterface'

interface Countries {
  isLoading: boolean
  countries: CountryElement[]
  currencies: CurrencyElement[]
}

export const useCountries = () => {
  const [state, setState] = useState<Countries>({
    isLoading: true,
    countries: [],
    currencies: []
  })

  useEffect(() => {
    // console.log('buscare paises')
    getCountriesAndCurrencies()
  }, [])

  const getCountriesAndCurrencies = async () => {
    const [countriesRes, currenciesRes] = await Promise.all([
      skyScanner.get<Country>('/reference/v1.0/countries/es-ES'),
      skyScanner.get<Currency>('/reference/v1.0/currencies')
    ])
    // console.log(countriesRes.data.Countries)

    setState({
      isLoading: false,
      countries: countriesRes.data.Countries.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0),
      currencies: currenciesRes.data.Currencies
    })
  }

  return {
    ...state
  }
}