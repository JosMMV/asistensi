export interface Currency {
  Currencies: CurrencyElement[];
}

export interface CurrencyElement {
  Code: string
  Symbol: string
  ThousandsSeparator: ThousandsSeparator
  DecimalSeparator: DecimalSeparator
  SymbolOnLeft: boolean
  SpaceBetweenAmountAndSymbol: boolean
  RoundingCoefficient: number
  DecimalDigits: number
}

export enum DecimalSeparator {
  DecimalSeparator = ',',
  Empty = '.',
  Fluffy = '-',
  Purple = '/'
}

export enum ThousandsSeparator {
  Empty = ',',
  Fluffy = "'",
  Purple = ' ',
  ThousandsSeparator = '.'
}
