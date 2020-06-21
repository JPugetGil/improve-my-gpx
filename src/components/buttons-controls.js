import * as MAPMODES from '../assets/constants/mapModes'

const buttonsControls = [
    {
        position: 'topright',
        buttons: [
            {
                color: 'dark',
                icon: 'folder-open',
                feature: {
                    isReducer: false,
                    todo: () => alert("FOLDER ICON")
                }
            },
            {
                color: 'dark',
                icon: 'hand-point-up',
                feature: {
                    isReducer: true,
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
                    isReducer: true,
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
                    isReducer: true,
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
                    isReducer: true,
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
                    isReducer: true,
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
                    isReducer: true,
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
                    isReducer: false,
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
                    isReducer: true,
                    todo: MAPMODES.LOCATEANDFOLLOW
                }
            }
        ]
    }
];


export default buttonsControls;
