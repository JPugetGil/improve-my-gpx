import React from "react"
import Control from "react-leaflet-control";
import {Button} from "react-bulma-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import buttonsControls from './buttons-controls';

const squareButton = {
  width: '2rem',
  height: '2rem',
  marginLeft: '1rem'
};

const MapControls = () => {
    return buttonsControls.map((control, index1) =>
        <Control key={index1} position={control.position}>
            {
                control.buttons.map((button, index) => {
                    return (
                        <Button key={index} onClick={button.feature} color={button.color} style={squareButton}>
                            <FontAwesomeIcon icon={button.icon}/>
                        </Button>
                    );
                })
            }
        </Control>
    );
}

export default MapControls;
