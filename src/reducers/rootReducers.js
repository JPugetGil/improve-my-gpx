import * as MAPMODES from '../assets/constants/mapModes';

// Lets assume it's the global state (you can add field here)
const initialState = {
    openDrawer: true,
    mobile: false,
    map: undefined,
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
};

// Add your action type here + describe what it does functionally (don't forget to add '...state' to get other fields)

export default function rootReducers(state = initialState, action) {
    switch (action.type) {
        case "TOGGLESIDEBAR":
            return {
                ...state,
                openDrawer: !state.openDrawer
            };
        case "CHANGEMODE":
            return {
                ...state,
                mode: action.mode === state.mode ? MAPMODES.MOVEMAP : action.mode
            };
        default:
            return state;
    }
}
