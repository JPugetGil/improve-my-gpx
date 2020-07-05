import React from 'react'
import { Hero } from 'react-bulma-components'
import 'leaflet/dist/leaflet.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { toggleSidebar } from '../actions/mapActions'
import MapControls from '../components/MapControls'
import Sidebar from '../components/sidebar/Sidebar'
import * as MAPMODES from '../assets/constants/mapModes'

class GPXMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props.mapState.mapReducers,
      ...props.mapState.mapReducers.map
    }
  }

  componentDidMount () {
    // BEGIN - quick fix to disable warning about missing icons
    delete Icon.Default.prototype._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    })
    // END - quick fix to disable warning about missing icons
  }

  getMyPosition () {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.centerPosition, this.checkError)
    } else {
      alert('Geolocation is not supported.') // TODO
    }
  }

  centerPosition (position) {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  checkError (error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('L\'utilisateur a refusé la requête pour la Geolocalisation.')
        break
      case error.POSITION_UNAVAILABLE:
        alert('Les informations de geolocalisation sont indisponibles.')
        break
      case error.TIMEOUT:
        alert('La requête a expiré.')
        break
      case error.UNKNOWN_ERROR:
        alert('Une erreur inconnue s\'est déroulée.')
        break
      default:
        break
    }
  }

  render () {
    const position = [this.state.lat, this.state.lng]
    const state = this.props.mapState.mapReducers
    const { t } = this.props

    const markers = [
      {
        position: position
      },
      {
        position: position
      },
      {
        position: position
      }
    ]

    return (
      <Hero size="fullheight">
        <Sidebar/>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution={'&copy; ' + t('contributors') + ': <a href="/about">HemöreG - Marvin - Anthony - Thomas</a>'}
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {markers.map((marker, index) =>
            <Marker key={index} position={marker.position} draggable={state.mode === MAPMODES.MOVEMARKER}>
              <Popup>Popup {index}.<br/>Easily customizable.</Popup>
            </Marker>
          )}
          <MapControls/>
        </Map>
      </Hero>
    )
  }
}

const mapStateToProps = state => ({
  mapState: state,
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar())
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GPXMap))
