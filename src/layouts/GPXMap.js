import React from 'react';
import {Hero} from "react-bulma-components";
import 'leaflet/dist/leaflet.css'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {Icon} from 'leaflet'
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {toggleSidebar} from '../actions/mapActions'
import MapControls from "../components/MapControls";
import * as MAPMODES from '../assets/constants/mapModes'

class GPXMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.mapState.rootReducers,
            lat: 51.505,
            lng: -0.09,
            zoom: 13
        };
    }

    componentDidMount() {
        // BEGIN - quick fix to disable warning about missing icons
        delete Icon.Default.prototype._getIconUrl;
        Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        // END - quick fix to disable warning about missing icons
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const state = this.props.mapState.rootReducers;
        const {t} = this.props;

        return (
            <Hero size="fullheight">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution={"&copy; " + t('contributors') + ": <a href=\"/about\">HemöreG - Marvin - Anthony - Thomas</a>"}
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position} draggable={state.mode === MAPMODES.MOVEMARKER}>
                        <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
                    </Marker>
                    <MapControls/>
                </Map>
            </Hero>
        );
    }
}

const mapStateToProps = state => ({
    mapState: state,
});

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GPXMap));
