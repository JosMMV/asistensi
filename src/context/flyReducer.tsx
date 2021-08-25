import { Place } from '../interfaces/PlacesInterface'
import { flyInitialState, FlyState } from './FlyContext'

type FlyAction =
  { type: 'setFrom', place: Place | undefined } |
  { type: 'setTo', place: Place | undefined }

export const flyReducer = (state: FlyState, action: FlyAction): FlyState => {
  switch (action.type) {
    case 'setFrom':
      return {
        ...state,
        from: action.place
      }
    case 'setTo':
      return {
        ...state,
        to: action.place
      }

    default:
      return state
  }
}