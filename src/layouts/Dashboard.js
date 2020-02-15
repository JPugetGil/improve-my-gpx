import React from 'react';
import {Hero} from "react-bulma-components";
import 'leaflet/dist/leaflet.css'
import {Map, TileLayer} from 'react-leaflet';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13
        };
    }

    componentDidMount() {
        console.log(this.props, this.state);
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        return (
            <Hero size="fullheight">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                </Map>
            </Hero>);
    }
}
