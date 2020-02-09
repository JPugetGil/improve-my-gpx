import black from '../../assets/markers/blackMarker.png'
import blue from '../../assets/markers/blueMarker.png'
import red from '../../assets/markers/redMarker.png'
import green from '../../assets/markers/greenMarker.png'
import purple from '../../assets/markers/purpleMarker.png'
import yellow from '../../assets/markers/yellowMarker.png'

import L from 'leaflet'

const blackMarker = L.icon({
    iconUrl: black,
    iconSize:     [40, 55],
    iconAnchor:   [20, 45],
    popupAnchor:  [0, -45]
});

const blueMarker = L.icon({
    iconUrl: blue,
    iconSize:     [40, 55],
    iconAnchor:   [20, 45],
    popupAnchor:  [0, -45]
});

const redMarker = L.icon({
    iconUrl: red,
    iconSize:     [40, 55],
    iconAnchor:   [20, 45],
    popupAnchor:  [0, -45]
});

const greenMarker = L.icon({
    iconUrl: green,
    iconSize:     [40, 55],
    iconAnchor:   [20, 45],
    popupAnchor:  [0, -45]
});

const purpleMarker = L.icon({
    iconUrl: purple,
    iconSize:     [40, 55],
    iconAnchor:   [20, 45],
    popupAnchor:  [0, -45]
});

const yellowMarker = L.icon({
    iconUrl: yellow,
    iconSize:     [40, 55],
    iconAnchor:   [20, 45],
    popupAnchor:  [0, -45]
});

export default {markers : {blackMarker, blueMarker, greenMarker, purpleMarker, redMarker, yellowMarker}};