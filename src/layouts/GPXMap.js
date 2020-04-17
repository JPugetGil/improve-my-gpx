import React from 'react';
import {Hero} from "react-bulma-components";
import 'leaflet/dist/leaflet.css'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {Icon} from 'leaflet'
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {toggleSidebar} from '../actions/mapActions'

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
        // BEGIN - quick fix to disable warning about icons are missing
        delete Icon.Default.prototype._getIconUrl;
        Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        // END - quick fix to disable warning about icons are missing

        console.log(this.state);
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const {t} = this.props;
        return (
            <Hero size="fullheight">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution={"&copy; " + t('contributors') + ": <a href='https://hemoreg.me/works/improvemygpx/html/apropos'> Improve my GPX</a>"}
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
                    </Marker>
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
