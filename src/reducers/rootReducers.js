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
    mode: "movemap"
};

// Add your action type here + describe what it does functionally (don't forget to add '...state' to get other fields)

export default function rootReducers(state = initialState, action) {
    switch (action.type) {
        case "TOGGLESIDEBAR":
            return {
                ...state,
                openDrawer: !state.openDrawer
            };
        default:
            return state;
    }
}
