import React from 'react';
import {Hero} from "react-bulma-components";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {Tools} from '../Utils/MapTools/Tools'
import file from '../assets/gpx/20120331_4j_TourCerces.gpx'

export default class Map extends React.Component {
    readFile;

    componentDidMount() {
        Tools.createGeoData()
            // .then(generateIndex)
            // .then(generateMap)
            // .then(generateTiles)
            .then(geoData => this.readGPXFile(geoData, file))
            .then(geoData => this.updateState(Tools.addPath(this.state.geoDatas, this.readFile)))
            .then(geoData => this.updateState(Tools.displayPath(this.state.geoDatas, 0)))
            .then(Tools.movePOV)
            // .then(setGeneralListeners)
            // .then(setListeners)
            // .then(setListenersUpdate)
            /* .then(geoData => {
                document.getElementById("moveMap").click();
                $("#tutorialButton").tooltip();

                return geoData;
            })*/
            .then(console.log)
            .catch(console.error);


        const position = [51.505, -0.09];

        this.map = L.map('mapid').setView(position, 13);
        L.tileLayer('http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="/about">HemöreG - Marvin - Anthony - Thomas</a>',
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map);
        L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(this.map);
    }

    readGPXFile(geoJSON, file) {
        Promise.resolve(file).then(content => {
            this.readFile = content;
            this.setState({geoDatas: geoJSON});
            return geoJSON;
        });
    }

    updateState(geoJSON) {
        Promise.resolve(geoJSON).then(data => {
            this.setState({geoDatas: data});
            return geoJSON;
        });
    }

    render() {
        return <Hero size="fullheight" id="mapid"/>
    }
}
