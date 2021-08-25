import React, { createContext, useReducer } from 'react'
import { Place } from '../interfaces/PlacesInterface'
import { flyReducer } from './flyReducer'

export interface FlyState {
  from: Place | undefined
  to: Place | undefined
}

export const flyInitialState: FlyState = {
  from: undefined,
  to: undefined
}

export interface FlyContextProps {
  flyState: FlyState
  setFrom: (place: Place | undefined) => void
  setTo: (place: Place | undefined) => void
}

export const FlyContext = createContext({} as FlyContextProps)

export const FlyProvider = ({ children }: any) => {
  const [flyState, dispatch] = useReducer(flyReducer, flyInitialState)

  const setFrom = (place: Place | undefined) => {
    dispatch({ type: 'setFrom', place })
  }

  const setTo = (place: Place | undefined) => {
    dispatch({ type: 'setTo', place })
  }

  return (
    <FlyContext.Provider value={{
      flyState,
      setFrom,
      setTo
    }}>
      {children}
    </FlyContext.Provider>
  )
}