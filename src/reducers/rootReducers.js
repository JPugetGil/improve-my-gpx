const initialState = {
    openDrawer: true,
    isMobile: false
};

export default function rootReducers(state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case "SWITCHDRAWER":
            return {
                ...state,
                openDrawer: !state.openDrawer
            };
        default:
            return state;
    }
}