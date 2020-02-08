import React from 'react';
import {Hero} from "react-bulma-components";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default class Map extends React.Component {

    componentDidMount() {
        /*
        createGeoData()
            .then(generateIndex)
            .then(generateMap)
            .then(generateTiles)
            .then(geoData => addPath(geoData, "gpx/runinlyon_10km.gpx"))
            .then(geoData => displayPath(geoData,0))
            .then(movePOV)
            .then(setGeneralListeners)
            .then(setListeners)
            .then(setListenersUpdate)
            .then(geoData => {
                document.getElementById("moveMap").click();
                $("#tutorialButton").tooltip();

                return geoData;
            })
            .then(console.log)
            .catch(console.error);
         */

        this.map = L.map('mapid', {
            center: [58, 16],
            zoom: 6,
            zoomControl: false
        });
        L.tileLayer('http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
        }).addTo(this.map)
    }

    render() {
        return <Hero size="fullheight" id="mapid"/>
    }
}
