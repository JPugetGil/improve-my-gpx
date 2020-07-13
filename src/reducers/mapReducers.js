import * as MAPMODES from '../assets/constants/mapModes'
// import { combineReducers } from 'redux'

// Lets assume it's the global state (you can add field here)
const initialState = {
  mobile: false,
  map: {
    lat: 0,
    lng: 0,
    zoom: 2
  },
  paths: [],
  layersControl: undefined,
  savedState: {
    paths: [],
    undo: false,
    upload: false
  },
  layers: [],
  markersColor: [],
  tempMarkers: [],
  focus: undefined,
  mode: MAPMODES.MOVEMAP
}

// Add your action type here + describe what it does functionally (don't forget to add '...state' to get other fields)
export default function mapReducers (state = initialState, action) {
  switch (action.type) {
    case 'CHANGEMODE':
      return {
        ...state,
        mode: action.mode === state.mode ? MAPMODES.MOVEMAP : action.mode,
      }
    default:
      return state
  }
}

// Later : if more mapReducer (async, ...) create function reducer, rename mapReducers into mapModeReducer and combine them by uncommenting)
// const mapReducers = combineReducers({
//   mapModeReducer,
// })
//
// export default mapReducers
