import React from 'react';
import Control from 'react-leaflet-control';
import { Button } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import buttonsControls from './buttons-controls';
import { changeMode } from '../actions/mapActions';
import { connect } from 'react-redux';

const squareButton = {
    width: '2rem',
    height: '2rem',
};

const MapControls = ({ changeMode }) => {
    return buttonsControls.map((control, index1) => (
        <Control key={index1} position={control.position}>
            {control.buttons.map((button, index) => {
                return (
                    <Button
                        key={index}
                        onClick={button.feature.isReducer ? () => changeMode(button.feature.todo) : button.feature.todo}
                        color={button.color}
                        style={{ ...squareButton, ...button.style }}
                    >
                        <FontAwesomeIcon icon={button.icon} />
                    </Button>
                );
            })}
        </Control>
    ));
};

const mapStateToProps = (state) => ({
    mapState: state,
});

const mapDispatchToProps = (dispatch) => ({
    changeMode: (mode) => dispatch(changeMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapControls);
