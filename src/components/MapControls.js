import React from 'react'
import Control from 'react-leaflet-control'
import { Button } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import buttonsControls from './buttons-controls'
import { changeMode } from '../actions/mapActions'
import { connect } from 'react-redux'
import * as ORIGINMODES from '../assets/constants/originModes'

const squareButton = {
    width: '2rem',
    height: '2rem',
    marginLeft: '1rem'
}

const MapControls = ({ changeMode }) => {

    function activate (feature) {
        switch (feature.origin) {
            case ORIGINMODES.FUNCTION:
                feature.todo()
                break
            case ORIGINMODES.REDUCER:
                // Means, "to do/add"
                break
            case ORIGINMODES.CHANGEMODE:
                changeMode(feature.todo)
                break
            default:
                break
        }
    }

    return buttonsControls.map((control, index1) =>
      <Control key={index1} position={control.position}>
          {
              control.buttons.map((button, index) => {
                  return (
                    <Button key={index}
                            onClick={() => activate(button.feature)}
                            color={button.color} style={squareButton}>
                        <FontAwesomeIcon icon={button.icon}/>
                        </Button>
                    );
                })
            }
        </Control>
    );
}

const mapStateToProps = state => ({
    mapState: state,
});

const mapDispatchToProps = dispatch => ({
    changeMode: (mode) => dispatch(changeMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapControls);
