import React, {Suspense} from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import routes from './routes';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import icons from './fontLibrary';
import {Fragment} from 'react'
library.add(...icons);

function App() {
    return (
        <Fragment>
            <Router>
                {routes.map((route, index) => (
                    <Suspense key={index} fallback={'LOADING...'}>
                        <Route
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                    </Suspense>
                ))}
            </Router>
        </Fragment>
    );
}

export default App;
