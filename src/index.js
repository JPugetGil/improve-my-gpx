import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';
import './index.css';

import configureStore, {history} from "./store/configureStore";


const store = configureStore(/* provide initial state if any */);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>

    , document.getElementById('root'));

serviceWorker.register();
