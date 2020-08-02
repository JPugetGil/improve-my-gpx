import * as MAPMODES from '../assets/constants/mapModes';
import { combineReducers } from 'redux';

import { REQUEST_ELEVATION, RECEIVE_ELEVATION, INVALIDATE_ELEVATION } from '../actions/mapActions';

// Lets assume it's the global state (you can add field here)
const initialState = {
    mobile: false,
    map: {
        lat: 0,
        lng: 0,
        zoom: 2,
    },
    paths: [],
    layersControl: undefined,
    savedState: {
        paths: [],
        undo: false,
        upload: false,
    },
    layers: [],
    markersColor: [],
    tempMarkers: [],
    focus: undefined,
    mode: MAPMODES.MOVEMAP,
};

// Add your action type here + describe what it does functionally (don't forget to add '...state' to get other fields)
export function mapModeReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGEMODE':
            return {
                ...state,
                mode: action.mode === state.mode ? MAPMODES.MOVEMAP : action.mode,
            };
        default:
            return state;
    }
}

function elevationsByCoordinates(
    state = {
        isFetching: false,
        didInvalidate: false,
        elevations: [],
    },
    action,
) {
    switch (action.type) {
        case INVALIDATE_ELEVATION:
            return Object.assign({}, state, {
                didInvalidate: true,
            });

        case REQUEST_ELEVATION:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });

        case RECEIVE_ELEVATION:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                elevations: action.elevations,
                lastUpdated: action.receivedAt,
            });

        default:
            return state;
    }
}

// Later : if more mapReducer (async, ...) create function reducer, rename mapReducers into mapModeReducer and combine them by uncommenting)
const mapReducers = combineReducers({
    mapModeReducer,
    elevationsByCoordinates,
});

export default mapReducers;
