export interface Fly {
  Quotes: Quote[]
  Carriers: Carrier[]
  Places: Place[]
  Currencies: Currency[]
}

export interface Carrier {
  CarrierId: number
  Name: string
}

export interface Currency {
  Code: string
  Symbol: string
  ThousandsSeparator: string
  DecimalSeparator: string
  SymbolOnLeft: boolean
  SpaceBetweenAmountAndSymbol: boolean
  RoundingCoefficient: number
  DecimalDigits: number
}

export interface Place {
  Name: string
  Type: string
  PlaceId: number
  IataCode: string
  SkyscannerCode: string
  CityName: string
  CityId: string
  CountryName: string
}

export interface Quote {
  QuoteId: number
  MinPrice: number
  Direct: boolean
  OutboundLeg: OutboundLeg
  QuoteDateTime: string
}

export interface OutboundLeg {
  CarrierIds: number[]
  OriginId: number
  DestinationId: number
  DepartureDate: string
}
