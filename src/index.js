import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';

import rootReducers from "./reducers/rootReducers";


const store = createStore(rootReducers);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
