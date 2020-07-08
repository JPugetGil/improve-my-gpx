import * as MAPMODES from '../assets/constants/mapModes'
import * as ORIGINMODES from '../assets/constants/originModes'

const buttonsControls = [
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'folder-open',
                feature: {
                    origin: ORIGINMODES.FUNCTION,
                    todo: () => alert('FOLDER ICON')
                }
            },
            {
                color: 'dark',
                icon: 'hand-point-up',
                feature: {
                    origin: ORIGINMODES.CHANGEMODE,
                    todo: MAPMODES.MOVEMARKER
                }
            }
        ]
    },
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'plus',
                feature: {
                    origin: ORIGINMODES.CHANGEMODE,
                    todo: MAPMODES.ADDMARKER
                }
            }
        ]
    },
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'minus',
                feature: {
                    origin: ORIGINMODES.CHANGEMODE,
                    todo: MAPMODES.REMOVEMARKER
                }
            }
        ]
    },
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'undo-alt',
                feature: {
                    origin: ORIGINMODES.CHANGEMODE,
                    todo: MAPMODES.UNDO
                }
            }
        ]
    },
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'redo-alt',
                feature: {
                    origin: ORIGINMODES.CHANGEMODE,
                    todo: MAPMODES.REDO
                }
            }
        ]
    },
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'question',
                feature: {
                    origin: ORIGINMODES.CHANGEMODE,
                    todo: MAPMODES.HELP
                }
            }
        ]
    },
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'print',
                feature: {
                    origin: ORIGINMODES.FUNCTION,
                    todo: () => window.print()
                }
            }
        ]
    },
    {
        position: 'topleft',
        buttons: [
            {
                color: 'dark',
                icon: 'compass',
                feature: {
                    origin: ORIGINMODES.REDUCER,
                    todo: MAPMODES.LOCATEANDFOLLOW
                }
            }
        ]
    }
];


export default buttonsControls;
