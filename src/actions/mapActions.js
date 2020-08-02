import fetch from 'cross-fetch';

export const toggleSidebar = () => ({
    type: 'TOGGLESIDEBAR',
});

export const changeMode = (mode) => ({
    type: 'CHANGEMODE',
    mode: mode,
});

export const REQUEST_ELEVATION = 'REQUEST_ELEVATION';
function requestPosts(coordinates) {
    return {
        type: REQUEST_ELEVATION,
        coordinates,
    };
}

export const RECEIVE_ELEVATION = 'RECEIVE_ELEVATION';
function receivePosts(coordinates, json) {
    return {
        type: RECEIVE_ELEVATION,
        coordinates,
        elevations: json.resourceSets[0].resources[0].elevations,
        receivedAt: Date.now(),
    };
}

export const INVALIDATE_ELEVATION = 'INVALIDATE_ELEVATION';
export function invalidateCoordinates(coordinates) {
    return {
        type: INVALIDATE_ELEVATION,
        coordinates,
    };
}

export function elevationsByCoordinates(coordinates) {
    return function (dispatch) {
        dispatch(requestPosts(coordinates));

        const coordinatesClean = coordinates.map((item) => item.join(',')).join(',');

        return fetch(
            'https://dev.virtualearth.net/REST/v1/Elevation/List?points=' +
                coordinatesClean +
                '&key=' +
                process.env.REACT_APP_BING_MAPS_API_KEY,
        )
            .then((response) => response.json())
            .then((json) => dispatch(receivePosts(coordinates, json)));
    };
}

// Actions needed inside the Map Component
